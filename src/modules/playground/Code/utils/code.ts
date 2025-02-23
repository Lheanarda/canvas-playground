export const generateCode = (html: string, js: string) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Canvas</title>
    <style>
    /* 1. Use a more-intuitive box-sizing model */
    *, *::before, *::after {
    box-sizing: border-box;
    }

    /* 2. Remove default margin */
    * {
    margin: 0;
    }

    body {
    /* 3. Add accessible line-height */
    line-height: 1.5;
    /* 4. Improve text rendering */
    -webkit-font-smoothing: antialiased;
    }

    /* 5. Improve media defaults */
    img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
    }

    /* 6. Inherit fonts for form controls */
    input, button, textarea, select {
    font: inherit;
    }

    /* 7. Avoid text overflows */
    p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
    }

    /* 8. Improve line wrapping */
    p {
    text-wrap: pretty;
    }
    h1, h2, h3, h4, h5, h6 {
    text-wrap: balance;
    }

    /*
    9. Create a root stacking context
    */
    #root, #__next {
    isolation: isolate;
    }
     body{
          background:white  
       }  
    </style>
</head>
<body>
   ${html}
   <script>
      ${js}
   </script>
</body>
</html>`;
};
