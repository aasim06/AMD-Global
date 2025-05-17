CKEDITOR.replace('editor1', {
    toolbar: [
        { name: 'basicstyles', items: ['Bold', 'Italic', 'Strike', '-', 'RemoveFormat'] },
        { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Blockquote'] },
        { name: 'styles', items: ['Styles', 'Format'] },
        { name: 'document', items: ['Source'] },
        '/',
        { name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo'] },
        { name: 'editing', items: ['Find', 'Replace', '-', 'SelectAll'] },
        { name: 'insert', items: ['Image', 'Table', 'HorizontalRule', 'SpecialChar'] },
        { name: 'links', items: ['Link', 'Unlink', 'Anchor'] },
        { name: 'tools', items: ['Maximize', 'ShowBlocks'] }
    ],
    height: 200,
    removeButtons: 'Underline,Subscript,Superscript',
    format_tags: 'p;h1;h2;h3;pre',
    removeDialogTabs: 'image:advanced;link:advanced',
    stylesSet: [
        { name: 'Normal', element: 'p', styles: { color: '#000000' } },
        { name: 'Heading 1', element: 'h1', styles: { color: '#000000' } },
        { name: 'Heading 2', element: 'h2', styles: { color: '#000000' } },
        { name: 'Heading 3', element: 'h3', styles: { color: '#000000' } },
        { name: 'Code', element: 'pre', styles: { color: '#000000' } }
    ]
});