export interface IDatabaseConnection {
	generateUri: () => string;
	getConnection: () => void;
}
