export const healthCheckController = (req, res) => {
    res.json({
        status: 200,
        message:
            "Test API is working. Go to /api/user/signup to signup or /api/user/login to login",
    });
};
