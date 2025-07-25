import React from 'react';

export default function PostEditor({ form, onChange, onSubmit, submitLabel = 'Publish', error }) {
  return (
    <form onSubmit={onSubmit} className="post-editor-form">
      {error && <p className="error-message">{error}</p>}

      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={onChange}
        required
        className="post-editor-input"
      />

      <textarea
        name="content"
        placeholder="Content"
        value={form.content}
        onChange={onChange}
        rows={8}
        required
        className="post-editor-textarea"
      />

      <input
        name="tags"
        placeholder="Tags (comma separated)"
        value={form.tags}
        onChange={onChange}
        className="post-editor-input"
      />

      <button type="submit" className="post-editor-submit-btn">{submitLabel}</button>
    </form>
  );
}