import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEDITOR_CONFIGS } from "../../Constans/MetaData";

const ArticleCreate = () => {
  return (
    <div className="App" id="editor">
      <h2>Using CKEditor&nbsp;5 build in React</h2>
      <CKEditor
        height="500px"
        editor={ClassicEditor}
        data="<p>Hello from CKEditor&nbsp;5!</p>"
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log("Editor is ready to use!", editor);
        }}

        config={CKEDITOR_CONFIGS}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log({ event, editor, data });
        }}
        onBlur={(event, editor) => {
          console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          console.log("Focus.", editor);
        }}
      />
    </div>
  );
};

export default ArticleCreate;
