import hljs from 'highlight.js';
import React from 'react';

import 'primer-markdown/build/build.css';
import 'highlight.js/styles/monokai-sublime.css';
import './Content.css';

export default class Content extends React.Component {
	componentDidMount() {
		if ( ! this.element ) {
			return;
		}

		// Find all the code blocks, and highlight them.
		const blocks = this.element.querySelectorAll( 'pre > code' );
		blocks.forEach( block => {
			hljs.highlightBlock( block );
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
