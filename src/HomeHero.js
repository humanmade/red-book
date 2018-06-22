import React from 'react';

import Logo from './Logo';

import './HomeHero.css';

export default function HomeHero( props ) {
	const { image, title, title_with_logo, text } = props;

	if ( ! title && ! text ) {
		return null;
	}

	return (
		<div className="HomeHeader">
			{ image && (
				<div
					className="HomeHeader_bg-image"
					style={ { backgroundImage: `url( ${ image.source_url } )` } }
				/>
			) }
			<div>
				{ title && (
					<p className="HomeHeader_title">
						{ title_with_logo && <Logo short /> }
						{ title }
					</p>
				) }
				{ text && <p>{ text }</p> }
			</div>
		</div>
	);
}
