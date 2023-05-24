import React, {useEffect} from 'react';
import './App.scss';
import {useRef} from 'react';
import GitHubProjectPanel from './components/GitHubProjectPanel';
import {CubeAscii} from 'cube-ascii-react';
import CopyImage from './images/copy.svg';
import {GITHUB_LINK, AUTHOR} from './constants/project-constants';

const App = () => {
	const divRef = useRef(null);
	const preTagRef = useRef(null);
	const [isLoaded, setIsLoaded] = React.useState(false);
	const [useColor, setUseColor] = React.useState(true);

	const copyToClipboard = async text => {
		try {
			await navigator.clipboard.writeText(text);
			console.log('Text copied to clipboard');
		} catch (err) {
			console.error('Failed to copy text: ', err);
		}
	};

	const toggleColorMode = () => {
		setUseColor(!useColor);
	};

	useEffect(() => {
		if (divRef.current) {
			setIsLoaded(true);
		}
	}, [divRef]);

	return (
		<div className='App' ref={divRef}>
			{isLoaded
				? (
					<>
						<button className={'Button-Copy-Clipboard'}
							onClick={async () => copyToClipboard(preTagRef.current.innerText)}>
							<img src={CopyImage} alt={'CopyLogoImage'}/>
						</button>
						<button
							className={`${'Button-Toggle-Mode'} ${useColor ? 'Button-Toggle-BW' : 'Button-Toggle-Color'}`}
							onClick={() => {
								toggleColorMode();
							}}>
						</button>
						<CubeAscii parentRef={divRef} useColor={useColor} preTagRef={preTagRef}/>
					</>
				)
				: (<div>Loading</div>)
			}
			<GitHubProjectPanel link={GITHUB_LINK} author={AUTHOR}/>
		</div>
	);
};

export default App;
