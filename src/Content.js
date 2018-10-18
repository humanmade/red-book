import Prism from 'prismjs';
import React from 'react';

// Load additional languages from Prism
import 'prismjs/components/prism-bash.min';
import 'prismjs/components/prism-jsx.min';
import 'prismjs/components/prism-markup-templating.min';
import 'prismjs/components/prism-php.min';
import 'prismjs/components/prism-scss.min';
import 'prismjs/components/prism-yaml.min';

import 'prismjs/themes/prism-okaidia.css';
import './Content.css';

// Alias JS to JSX
Prism.languages.javascript = Prism.languages.jsx;
Prism.languages.js = Prism.languages.jsx;

// Alias SH to shell
Prism.languages.sh = Prism.languages.shell;

export default class Content extends React.Component {
	componentDidMount() {
		if ( ! this.element ) {
			return;
		}

		// Find all the code blocks, and highlight them.
		const blocks = this.element.querySelectorAll( 'pre > code' );
		blocks.forEach( block => {
			Prism.highlightElement( block );
			block.parentNode.classList.add( 'Content-highlighted' );
		} );
	}

	render() {
		const { content } = this.props;

		return <div
			className="markdown-body"
			dangerouslySetInnerHTML={ { __html: content } }
			ref={ ref => this.element = ref }
		/>;
	}
}
