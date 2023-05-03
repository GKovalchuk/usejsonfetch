import { useState, useEffect } from 'react';



export default function useJsonFetch(url, opts) {
	const [data, setData] = useState(null);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		let isLoading = false;
		const fetchData = async (opts, url) => {
			if (isLoading) return;
			let [newData, newError] = [null, false];
			setData(newData);
			setError(newError);
			if (typeof opts !== 'string' || typeof url !== 'string') return;
			const address = new URL(opts, url);
			try {
				const response = await fetch(address);
				if (!response.ok) {
					newError = `${response.status} ${response.statusText}`;
					throw new Error(response.status);
				}
				newData = await response.json();
			} catch (err) {
				console.error(err);
			} finally {
				if (!isLoading) {
					if (newData !== null && typeof newData === 'object') newData = JSON.stringify(newData);
					setData(newData);
					setError(newError);
					setLoading(false);
				}
			}
		};

		setLoading(true);
		fetchData(opts, url);
		return (() => isLoading = true);
	}, [opts]);

	return ([data, error, loading]);
};