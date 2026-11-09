export const site = {
	title: "Kirby",
	name: "양서린",
	role: "iOS · Android 앱 개발자",
	description: "양서린의 앱과 개발 기록",
	lang: "ko",
	github: "https://github.com/bisor0627",
	email: "bisor0627@gmail.com",
};

export type App = {
	name: string;
	summary: string;
	appStore?: string;
	playStore?: string;
	privacy?: string;
};

// Released apps, newest first. Leave empty until the first one ships.
export const apps: App[] = [];

export const expressiveCodeConfig = {
	theme: "github-dark",
};
