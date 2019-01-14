import React from "react";

export const SearchIcon = (props) => (
  <svg className={!!props.style ? props.style : "icon"} viewBox="0 0 57 57" xmlns="http://www.w3.org/2000/svg">
    <g>
      <path d="M55.146 51.887L41.588 37.786C45.074 33.642 46.984 28.428 46.984 23C46.984 10.318 36.666 0 23.984 0C11.302 0 0.983994 10.318 0.983994 23C0.983994 35.682 11.302 46 23.984 46C28.745 46 33.282 44.564 37.161 41.838L50.822 56.046C51.393 56.639 52.161 56.966 52.984 56.966C53.763 56.966 54.502 56.669 55.063 56.129C56.255 54.982 56.293 53.08 55.146 51.887ZM23.984 6C33.358 6 40.984 13.626 40.984 23C40.984 32.374 33.358 40 23.984 40C14.61 40 6.98399 32.374 6.98399 23C6.98399 13.626 14.61 6 23.984 6Z"/>
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="56.966" height="56.966" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

export const Rain = (props) => (
  <svg className={!!props.style ? props.style : "icon"} viewBox="0 0 515 481" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g>
      <path d="M405.962 13.612C398.925 13.612 392.288 15.209 386.274 17.924C374.253 -6.039 349.525 -22.535 320.885 -22.535C302.257 -22.535 285.303 -15.516 272.384 -4.051C250.658 -22.602 221.961 -34 190.396 -34C123.573 -34 69.344 16.614 67.967 79.517C42.913 91.145 25.509 116.447 25.509 145.871C25.509 179.875 48.737 208.391 80.178 216.595L418.757 218.919C457.935 217.514 489.29 185.393 489.29 145.871C489.29 117.652 473.302 93.21 449.902 80.999C452.512 75.07 454.023 68.558 454.023 61.664C454.024 35.127 432.508 13.612 405.962 13.612Z" fill="black"/>
      <path d="M141.818 338.364C150.319 321.926 151.342 247.004 151.342 247.004C151.342 247.004 90.792 291.145 82.291 307.582C73.79 324.02 80.226 344.235 96.664 352.736C113.102 361.237 133.317 354.802 141.818 338.364Z" fill="black"/>
      <path d="M266.13 338.364C274.631 321.926 275.654 247.004 275.654 247.004C275.654 247.004 215.104 291.145 206.603 307.582C198.102 324.02 204.538 344.235 220.975 352.736C237.414 361.237 257.629 354.802 266.13 338.364Z" fill="black"/>
      <path d="M354.861 352.736C371.299 361.237 391.514 354.801 400.015 338.364C408.516 321.926 409.539 247.004 409.539 247.004C409.539 247.004 348.989 291.145 340.488 307.582C331.988 324.021 338.423 344.235 354.861 352.736Z" fill="black"/>
      <path d="M125.361 477.049C141.799 485.55 162.014 479.114 170.515 462.677C179.016 446.239 180.039 371.317 180.039 371.317C180.039 371.317 119.49 415.458 110.988 431.895C102.487 448.333 108.923 468.548 125.361 477.049Z" fill="black"/>
      <path d="M249.673 477.049C266.111 485.55 286.326 479.114 294.827 462.677C303.328 446.239 304.351 371.317 304.351 371.317C304.351 371.317 243.801 415.458 235.3 431.895C226.8 448.333 233.235 468.548 249.673 477.049Z" fill="black"/>
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="514.8" height="514.8" fill="white" transform="translate(0 -34)"/>
      </clipPath>
    </defs>
  </svg>
);

export const Humidity = (props) => (
  <svg className={!!props.style ? props.style : "icon"} viewBox="0 0 367 448" xmlns="http://www.w3.org/2000/svg">
    <path d="M206.934 -59.0508C204.617 -63.5352 199.105 -65.2969 194.617 -62.9805C192.785 -62.0352 191.328 -60.5 190.48 -58.6211L128.875 79.1719L91.6445 10.6172C90.0664 7.59765 86.9024 5.73827 83.4922 5.83593C80.0938 5.88671 77.0039 7.81249 75.4688 10.8476L9.28126 141.262C-12.0312 183.09 4.60157 234.277 46.4336 255.59C48.2305 256.508 50.0625 257.359 51.9219 258.148C34.0078 333.473 74.7461 410.402 147.117 437.918C180.406 450.562 217.039 451.336 250.832 440.113L260.887 436.746C341.734 409.82 385.441 322.453 358.512 241.609C356.066 234.262 353.07 227.109 349.551 220.215L206.934 -59.0508ZM57.3242 240.605C23.7422 225.18 9.02345 185.445 24.4531 151.863C24.8125 151.082 25.1875 150.301 25.5781 149.531L83.8945 34.6016L119.477 100.191L61.125 230.781C59.6836 234.016 58.5313 237.316 57.3242 240.605V240.605ZM337.996 341.891C323 378.578 292.734 406.891 255.129 419.41L245.074 422.762C215.273 432.672 182.961 431.984 153.609 420.816C83.418 394.09 48.1836 315.527 74.9102 245.336C75.8203 242.945 76.8008 240.578 77.8438 238.238L199.41 -33.7227L333.316 228.523C351.336 263.82 353.047 305.227 337.996 341.891V341.891Z"/>
    <path d="M317.668 265.02H317.613C312.586 265.02 308.504 269.078 308.473 274.105C308.352 314.398 285.547 351.191 249.516 369.227C244.992 371.469 243.141 376.949 245.379 381.477C247.621 386 253.102 387.852 257.629 385.613C257.664 385.594 257.703 385.574 257.742 385.555C299.918 364.434 326.605 321.371 326.754 274.207C326.777 269.16 322.711 265.051 317.668 265.02V265.02Z"/>
  </svg>
);
export const Wind = (props) => (
  <svg className={!!props.style ? props.style : "icon"} viewBox="0 0 368 329" xmlns="http://www.w3.org/2000/svg">
    <path d="M296 9C256.305 9 224 41.2969 224 81C224 85.4258 227.586 89 232 89C236.414 89 240 85.4258 240 81C240 50.1289 265.121 25 296 25C326.879 25 352 50.1289 352 81C352 111.871 326.879 137 296 137H8C3.58594 137 0 140.574 0 145C0 149.426 3.58594 153 8 153H296C335.695 153 368 120.703 368 81C368 41.2969 335.695 9 296 9Z"/>
    <path d="M0 97C0 101.426 3.58594 105 8 105H136C166.879 105 192 79.8711 192 49C192 18.1289 166.879 -7 136 -7C105.121 -7 80 18.1289 80 49C80 53.4258 83.5859 57 88 57C92.4141 57 96 53.4258 96 49C96 26.9453 113.945 9 136 9C158.055 9 176 26.9453 176 49C176 71.0547 158.055 89 136 89H8C3.58594 89 0 92.5742 0 97Z"/>
    <path d="M248 281C225.945 281 208 263.055 208 241C208 236.574 204.414 233 200 233C195.586 233 192 236.574 192 241C192 271.871 217.121 297 248 297C278.879 297 304 271.871 304 241C304 210.129 278.879 185 248 185H8C3.58594 185 0 188.574 0 193C0 197.426 3.58594 201 8 201H248C270.055 201 288 218.945 288 241C288 263.055 270.055 281 248 281Z"/>
  </svg>
);

export const Arrow = (props) => (
  <svg className={!!props.style ? props.style : "icon"}  viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <g>
      <path d="M21.205 5.007C20.776 4.563 20.062 4.563 19.618 5.007C19.189 5.436 19.189 6.15 19.618 6.578L27.665 14.625H1.111C0.492 14.626 0 15.118 0 15.737C0 16.356 0.492 16.864 1.111 16.864H27.665L19.618 24.896C19.189 25.34 19.189 26.055 19.618 26.483C20.062 26.927 20.777 26.927 21.205 26.483L31.157 16.531C31.601 16.102 31.601 15.388 31.157 14.96L21.205 5.007Z"/>
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="31.49" height="31.49" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);