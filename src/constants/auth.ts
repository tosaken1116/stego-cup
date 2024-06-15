const AUTH_API_KEY =
	process.env.NODE_ENV === "production"
		? process.env.NEXT_PUBLIC_PROD_AUTH_API_KEY
		: process.env.NEXT_PUBLIC_DEV_AUTH_API_KEY;
if (!AUTH_API_KEY) {
	throw new Error("AUTH_API_KEY is not defined");
}

const AUTH_DOMAIN =
	process.env.NODE_ENV === "production"
		? process.env.NEXT_PUBLIC_PROD_AUTH_DOMAIN
		: process.env.NEXT_PUBLIC_DEV_AUTH_DOMAIN;

if (!AUTH_DOMAIN) {
	throw new Error("AUTH_DOMAIN is not defined");
}

export { AUTH_API_KEY, AUTH_DOMAIN };
