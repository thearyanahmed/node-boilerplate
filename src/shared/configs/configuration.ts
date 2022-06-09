export default (): any => ({
	env: process.env.APP_ENV,
	port: process.env.APP_PORT,
	database: {
		connection_name: process.env.CONNECTION_NAME,
		host: process.env.DB_HOST,
		port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
		name: process.env.DB_NAME,
		user: process.env.DB_USER,
		pass: process.env.DB_PASS,
	},
	throttler: {
		ttl: process.env.THROTTLE_TTL,
		limit: process.env.THROTTLE_LIMIT,
	},
})
