import React, { Component } from 'react';

// The editor core
import Editor, { Editable, createEmptyState } from 'ory-editor-core';
import 'ory-editor-core/lib/index.css'; // we also want to load the stylesheets

// Require our ui components (optional). You can implement and use your own ui too!
import { Trash, DisplayModeToggle, Toolbar } from 'ory-editor-ui';
import 'ory-editor-ui/lib/index.css';

// Load some exemplary plugins:
import slate from 'ory-editor-plugins-slate'; // The rich text area plugin
import ParagraphPlugin from 'ory-editor-plugins-slate/lib/plugins/paragraph';
import 'ory-editor-plugins-slate/lib/index.css'; // Stylesheets for the rich text area plugin
import 'ory-editor-plugins-parallax-background/lib/index.css'; // Stylesheets for parallax background images

require('react-tap-event-plugin')(); // react-tap-event-plugin is required by material-ui which is used by ory-editor-ui so we need to call it here

// Define which plugins we want to use. We only have slate and parallax available, so load those.
const plugins = {
  content: [
    slate({
      plugins: [new ParagraphPlugin()],
    }),
  ], // Define plugins for content cells
  layout: [],
};

class App extends Component {
  componentWillMount() {
    const value = document.getElementById('field').value;
    this.editorState = JSON.parse(value) || createEmptyState();
    this.editor = new Editor({
      plugins,
      defaultPlugin: slate(),
      editables: [this.editorState],
    });
  }
  render() {
    return (
      <div>
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>

        <Editable
          editor={this.editor}
          id={this.editorState.id}
          onChange={state =>
            (document.getElementById('field').value = JSON.stringify(
              state,
              // state.cells[0].content.state.serialized,
            ))}
        />

        <Trash editor={this.editor} />
        <DisplayModeToggle editor={this.editor} />
        <Toolbar editor={this.editor} />
      </div>
    );
  }
}

export default App;
