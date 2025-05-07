import { getRedisClient } from "./redis";

async function setValue(key: string, value: string) {
	try {
		const redis = getRedisClient();
		await redis.set(key, value);
	} catch (error) {
		console.log(
			`Couldn't set redis key ${key}. Error: ${JSON.stringify(error)}`
		);
	}
}

async function getValue(key: string) {
  try {
		const redis = getRedisClient();
		return await redis.get(key);
	} catch (error) {
		console.log(
			`Couldn't get redis key ${key}. Error: ${JSON.stringify(error)}`
		);
	}
}

export { setValue, getValue };
