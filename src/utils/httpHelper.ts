export const httpHelper = {
    getQueryParam: (name: string): string => {
		let searchParams = new URLSearchParams(window.location.search);
		return searchParams.get(name) || "";
	}
}