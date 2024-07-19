import * as React from "react"
import { SVGProps } from "react"
const DeleteButtonIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="1em"
    height="1em"
    enableBackground="new"
    viewBox="0 0 100 100"
    {...props}
  >
    <defs>
      <filter
        id="a"
        width={1.348}
        height={1.308}
        x={-0.174}
        y={-0.154}
        style={{
          colorInterpolationFilters: "sRGB",
        }}
      >
        <feGaussianBlur result="fbSourceGraphic" stdDeviation="0.5 0.5" />
        <feColorMatrix
          in="fbSourceGraphic"
          result="fbSourceGraphicAlpha"
          values="0 0 0 -1 0 0 0 0 -1 0 0 0 0 -1 0 0 0 0 1 0"
        />
        <feGaussianBlur
          in="fbSourceGraphic"
          result="blur"
          stdDeviation="0.5 0.5"
        />
      </filter>
      <filter
        id="g"
        width={1.097}
        height={1.206}
        x={-0.049}
        y={-0.104}
        style={{
          colorInterpolationFilters: "sRGB",
        }}
      >
        <feTurbulence
          baseFrequency="0.25 0.4"
          numOctaves={3}
          seed={5}
          type="fractalNoise"
        />
        <feColorMatrix
          result="result5"
          values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"
        />
        <feComposite in="SourceGraphic" in2="result5" operator="in" />
        <feMorphology operator="dilate" radius={1.5} result="result3" />
        <feTurbulence
          baseFrequency={0.03}
          numOctaves={5}
          seed={7}
          type="fractalNoise"
        />
        <feGaussianBlur result="result91" stdDeviation={0.5} />
        <feDisplacementMap
          in="result3"
          in2="result91"
          result="result4"
          scale={27}
          xChannelSelector="R"
          yChannelSelector="G"
        />
        <feComposite
          in="result4"
          in2="result4"
          k1={1.3}
          k3={0.8}
          operator="arithmetic"
          result="result2"
        />
        <feBlend in="result2" in2="result2" mode="screen" />
      </filter>
      <clipPath id="e" clipPathUnits="userSpaceOnUse">
        <path
          d="M0 0h100v100H0z"
          style={{
            color: "#000",
            display: "inline",
            overflow: "visible",
            visibility: "visible",
            opacity: 1,
            fill: "#ff0",
            fillOpacity: 1,
            fillRule: "nonzero",
            stroke: "none",
            strokeWidth: 20,
            strokeLinecap: "square",
            strokeLinejoin: "miter",
            strokeMiterlimit: 4,
            strokeDasharray: "none",
            strokeDashoffset: 1.0989,
            strokeOpacity: 1,
            marker: "none",
            enableBackground: "accumulate",
          }}
        />
      </clipPath>
      <marker
        id="d"
        orient="auto"
        refX={0}
        refY={0}
        style={{
          overflow: "visible",
        }}
      >
        <path
          d="M8.719 4.034-2.207.016 8.719-4.002c-1.746 2.372-1.736 5.618 0 8.036z"
          style={{
            fill: "#000",
            fillOpacity: 1,
            fillRule: "evenodd",
            stroke: "#000",
            strokeWidth: 0.625,
            strokeLinejoin: "round",
            strokeOpacity: 1,
          }}
          transform="scale(-.6)"
        />
      </marker>
      <mask id="f" maskUnits="userSpaceOnUse">
        <g
          style={{
            display: "inline",
          }}
        >
          <path
            d="M49.218 32.835c-9.57.75-25.203 11.917-25.203 11.917 5.332 5.652 15.158 11.54 24.177 11.933a20.486 20.486 0 0 0 1.892 0c9.018-.393 18.843-6.28 24.174-11.933 0 0-15.47-11.17-25.04-11.917z"
            style={{
              fill: "#fff",
              stroke: "#000",
              strokeWidth: ".880689px",
            }}
          />
          <ellipse
            cx={49.136}
            cy={44.77}
            rx={7.179}
            ry={9.898}
            style={{
              fill: "gray",
              stroke: "#000",
              strokeWidth: 0.8136,
              strokeOpacity: 1,
            }}
          />
          <ellipse
            cx={49.121}
            cy={44.854}
            rx={2.961}
            ry={7.407}
            style={{
              fill: "#000",
              stroke: "#000",
              strokeWidth: 0.452049,
              strokeOpacity: 1,
            }}
          />
          <path
            d="m49.097 35.213-.034.002c-1.588.078-4.487 1.039-6.264 5.7-.666 1.747-.71 4.072-.355 6.025.304 1.683 1.643 3.853 1.643 3.853s-1.099-2.613-1.237-4.008c-.179-1.81-.279-2.303.553-5.428.813-3.058 2.783-5.308 5.726-5.402 2.943.094 4.912 2.344 5.726 5.402.832 3.125.732 3.618.553 5.428-.139 1.395-1.238 4.008-1.238 4.008s1.34-2.17 1.644-3.853c.354-1.953.31-4.278-.355-6.026-1.777-4.66-4.676-5.621-6.264-5.7l-.066-.001h-.032z"
            style={{
              display: "inline",
              fill: "#000",
              strokeWidth: 0.230534,
              filter: "url(#a)",
            }}
          />
          <path
            d="m49.097 35.213-.034.002c-1.588.078-4.487 1.039-6.264 5.7-.666 1.747-.71 4.072-.355 6.025.304 1.683 1.643 3.853 1.643 3.853s-1.099-2.613-1.237-4.008c-.179-1.81-.279-2.303.553-5.428.813-3.058 2.783-5.308 5.726-5.402 2.943.094 4.912 2.344 5.726 5.402.832 3.125.732 3.618.553 5.428-.139 1.395-1.238 4.008-1.238 4.008s1.34-2.17 1.644-3.853c.354-1.953.31-4.278-.355-6.026-1.777-4.66-4.676-5.621-6.264-5.7l-.066-.001h-.032z"
            style={{
              display: "inline",
              fill: "#000",
              strokeWidth: 0.230534,
              filter: "url(#a)",
            }}
          />
          <path
            d="M49.096 35.213c-4.508.395-7.21 5.236-7.11 9.412-.185 1.845 1.074 5.06 1.702 5.637-1.863-3.943-1.427-8.985 1.356-12.383 1.949-2.46 5.962-2.54 8.03-.168 1.978 2.157 2.671 5.267 2.611 8.128.125 1.42-.955 3.79-1.027 4.452 3.092-4.746 1.693-12.273-3.695-14.698a5.374 5.374 0 0 0-1.867-.38z"
            style={{
              display: "inline",
              fill: "#eee",
              strokeWidth: 0.234245,
            }}
          />
          <ellipse
            cx={49.062}
            cy={48.959}
            rx={1.256}
            ry={2.091}
            style={{
              display: "inline",
              fill: "#fff",
              stroke: "none",
              strokeWidth: 0.60246,
              strokeOpacity: 1,
            }}
          />
        </g>
      </mask>
    </defs>
    <g
      style={{
        display: "inline",
      }}
    >
      <use
        xlinkHref="#b"
        width="100%"
        height="100%"
        style={{
          opacity: 0.3,
        }}
      />
      <use
        xlinkHref="#c"
        width="100%"
        height="100%"
        style={{
          opacity: 0.3,
        }}
      />
      <path
        d="M-348.84-380.862h526.662v360.006H-348.84z"
        style={{
          opacity: 1,
          fill: "#fff",
          fillOpacity: 1,
          fillRule: "evenodd",
          stroke: "none",
          strokeWidth: 76.9908,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeMiterlimit: 4,
          strokeDasharray: "none",
          strokeDashoffset: 0,
          strokeOpacity: 1,
          paintOrder: "normal",
        }}
      />
      <text
        xmlSpace="preserve"
        x={-326.822}
        y={-349.806}
        style={{
          fontStyle: "normal",
          fontVariant: "normal",
          fontWeight: 400,
          fontStretch: "normal",
          lineHeight: "0%",
          fontFamily: "sans-serif",
          InkscapeFontSpecification: "Verdana",
          letterSpacing: 0,
          wordSpacing: 0,
          fill: "#000",
          fillOpacity: 1,
          stroke: "none",
        }}
      >
        <tspan
          x={-326.822}
          y={-349.806}
          style={{
            fontStyle: "normal",
            fontVariant: "normal",
            fontWeight: 700,
            fontStretch: "normal",
            fontSize: "23.6686px",
            lineHeight: 1.25,
            fontFamily: "sans-serif",
            InkscapeFontSpecification: "&quot",
          }}
        >
          {"Seamless pattern"}
        </tspan>
      </text>
      <path
        d="M-354.49-359.49h-6.171V51.516h229.605"
        style={{
          color: "#000",
          textDecoration: "none",
          textDecorationLine: "none",
          display: "inline",
          overflow: "visible",
          visibility: "visible",
          fill: "none",
          stroke: "#000",
          strokeWidth: 3.77953,
          strokeLinecap: "butt",
          strokeLinejoin: "miter",
          strokeMiterlimit: 4,
          strokeDasharray: "none",
          strokeDashoffset: 0,
          strokeOpacity: 1,
          marker: "none",
          markerEnd: "url(#d)",
          enableBackground: "accumulate",
        }}
      />
      <g
        clipPath="url(#e)"
        style={{
          display: "inline",
        }}
      >
        <g
          id="c"
          style={{
            display: "inline",
          }}
        >
          <g
            style={{
              display: "inline",
            }}
          >
            <g
              style={{
                display: "inline",
              }}
            >
              <path
                d="m31.932 31.071 6.055 36.498h26.275l6.055-36.498H46.77Z"
                style={{
                  fill: "#000",
                  stroke: "#000",
                  strokeWidth: "1.1178px",
                }}
                transform="translate(.644 6.602)"
              />
              <path
                d="m25.059 28.842 8.484-4.19h36.815l8.484 4.19H45.851Z"
                style={{
                  fill: "#000",
                  stroke: "#000",
                  strokeWidth: ".448326px",
                }}
                transform="translate(.644 6.602)"
              />
              <path
                d="M50.592 19.228a11.488 7.087 0 0 0-11.463 6.843h4.1a8.142 5.858 0 0 1 7.365-3.421 8.142 5.858 0 0 1 7.377 3.421h4.1a11.488 7.087 0 0 0-11.48-6.843z"
                style={{
                  stroke: "#000",
                  strokeWidth: 1.25102,
                }}
                transform="translate(.644 6.602)"
              />
            </g>
            <circle
              cx={50.829}
              cy={52.212}
              r={45.827}
              style={{
                display: "inline",
                fill: "none",
                fillOpacity: 1,
                stroke: "#000",
                strokeWidth: 0.631112,
                strokeDasharray: "none",
                strokeOpacity: 1,
              }}
            />
          </g>
        </g>
        <use
          xlinkHref="#b"
          width="100%"
          height="100%"
          transform="translate(-100 -100)"
        />
        <use
          xlinkHref="#b"
          width="100%"
          height="100%"
          transform="translate(0 -100)"
        />
        <use
          xlinkHref="#b"
          width="100%"
          height="100%"
          transform="translate(100 -100)"
        />
        <use
          xlinkHref="#b"
          width="100%"
          height="100%"
          transform="translate(-100)"
        />
        <use xlinkHref="#b" width="100%" height="100%" />
        <use
          xlinkHref="#b"
          width="100%"
          height="100%"
          transform="translate(100)"
        />
        <use
          xlinkHref="#b"
          width="100%"
          height="100%"
          transform="translate(-100 100)"
        />
        <use
          xlinkHref="#b"
          width="100%"
          height="100%"
          transform="translate(0 100)"
        />
        <use
          xlinkHref="#b"
          width="100%"
          height="100%"
          transform="translate(100 100)"
        />
        <use
          xlinkHref="#c"
          width="100%"
          height="100%"
          transform="translate(-100 -100)"
        />
        <use
          xlinkHref="#c"
          width="100%"
          height="100%"
          transform="translate(0 -100)"
        />
        <use
          xlinkHref="#c"
          width="100%"
          height="100%"
          transform="translate(100 -100)"
        />
        <use
          xlinkHref="#c"
          width="100%"
          height="100%"
          transform="translate(-100)"
        />
        <use xlinkHref="#c" width="100%" height="100%" />
        <use
          xlinkHref="#c"
          width="100%"
          height="100%"
          transform="translate(100)"
        />
        <use
          xlinkHref="#c"
          width="100%"
          height="100%"
          transform="translate(-100 100)"
        />
        <use
          xlinkHref="#c"
          width="100%"
          height="100%"
          transform="translate(0 100)"
        />
        <use
          xlinkHref="#c"
          width="100%"
          height="100%"
          transform="translate(100 100)"
        />
      </g>
    </g>
  </svg>
)
export default DeleteButtonIcon
