const environment = {
    port: process.env.PORT || 4000,
    env: process.env.NODE_ENV || 'local',
    jwtSecret: process.env.JWT_SECRET as string,
};

export default environment;
