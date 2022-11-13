export class HTTPError extends Error {
	context: string;
	statusCode: number;

	constructor(context: string, statusCode: number, message: string) {
		super(message);
		this.context = context;
		this.statusCode = statusCode;
		this.message = message;
	}
}

export function createNewError(context: string, statusCode: number, message: string) {
	return new HTTPError(context, statusCode, message);
}
