const express = require("express");
const cors = require("cors");

const app = express();

const axios = require("axios");

app.use(cors());

app.get("/", (req, res) => {
    res.send("Backend running");
});

/* TEST API */

app.get("/api/test", (req, res) => {

    res.json({
        message: "Portfolio API working properly"
    });

});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});

app.get("/api/codeforces/:handle", async (req, res) => {
    try {
        const { handle } = req.params;

        const userInfoResponse = await axios.get(
            `https://codeforces.com/api/user.info?handles=${handle}`
        );

        const ratingResponse = await axios.get(
            `https://codeforces.com/api/user.rating?handle=${handle}`
        );

        const user = userInfoResponse.data.result[0];
        const ratingHistory = ratingResponse.data.result;

        const graphData = ratingHistory.map(contest => ({
            contestName: contest.contestName,
            rating: contest.newRating,
            rank: contest.rank,
            date: new Date(contest.ratingUpdateTimeSeconds * 1000).toLocaleDateString()
        }));

        res.json({
            handle: user.handle,
            currentRating: user.rating,
            maxRating: user.maxRating,
            rank: user.rank,
            maxRank: user.maxRank,
            contribution: user.contribution,
            graphData: graphData
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch Codeforces data"
        });
    }
});

app.get("/api/github/:username", async (req, res) => {
    try {
        const { username } = req.params;

        const userResponse = await axios.get(
            `https://api.github.com/users/${username}`
        );

        const eventsResponse = await axios.get(
            `https://api.github.com/users/${username}/events/public?per_page=100`
        );

        const user = userResponse.data;
        const events = eventsResponse.data;

        const commitMap = {};

        events.forEach(event => {
            if (event.type === "PushEvent") {
                const date = new Date(event.created_at).toLocaleDateString();

                const commitCount = event.payload.commits
                    ? event.payload.commits.length
                    : 0;

                commitMap[date] = (commitMap[date] || 0) + commitCount;
            }
        });

        const graphData = Object.keys(commitMap).reverse().map(date => ({
            date,
            commits: commitMap[date]
        }));

        res.json({
            username: user.login,
            publicRepos: user.public_repos,
            followers: user.followers,
            profile: user.html_url,
            graphData
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch GitHub data"
        });
    }
});