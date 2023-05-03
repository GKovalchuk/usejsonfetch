import logo from '../logo.svg';
import { useState } from 'react';
import useJsonFetch from '../hooks/useJsonFetch';
import './TargetComponent.css';

function TargetComponent(props) {
	const url = process.env.REACT_APP_TEST_BASEURL;
	const [opts, setOpts] = useState(null);
	const [data, error, loading] = useJsonFetch(url, opts);

	return (
		<div className="target-component">
			<button type='button' onClick={() => setOpts('data')}>data</button>
			<button type='button' onClick={() => setOpts('error')}>error</button>
			<button type='button' onClick={() => setOpts('loading')}>loading</button>
			{opts && <div className="text">
				{data && `${data}`}
				{error && `Error: ${error}`}
				{loading && <img src={logo} alt="" />}
			</div>}
		</div>
	);
}

export default TargetComponent;
