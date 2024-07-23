import * as React from "react"
import { SVGProps } from "react"
const GanttChartIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="1em"
    height="1em"
    enableBackground="new"
    viewBox="0 0 110 90"
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
        id="f"
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
      <clipPath id="d" clipPathUnits="userSpaceOnUse">
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
        id="c"
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
      <mask id="e" maskUnits="userSpaceOnUse">
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
          markerEnd: "url(#c)",
          enableBackground: "accumulate",
        }}
      />
      <g
        clipPath="url(#d)"
        style={{
          display: "inline",
        }}
      >
        <rect
          width={48.134}
          height={53.328}
          x={10.753}
          y={34.43}
          ry={5.275}
          style={{
            display: "inline",
            fill: "#fff",
            fillOpacity: 1,
            stroke: "#000",
            strokeOpacity: 1,
          }}
          transform="rotate(-15)"
        />
        <path
          d="M10.753 61.094h39.591v6.354H10.753z"
          style={{
            display: "inline",
            fill: "#dd6b2c",
            fillOpacity: 1,
            stroke: "none",
            strokeWidth: 0.338228,
            strokeDasharray: "none",
            strokeOpacity: 1,
          }}
          transform="rotate(-15)"
        />
        <path
          d="M11.218 71.262h22.993v6.354H11.218z"
          style={{
            display: "inline",
            fill: "#fddc87",
            fillOpacity: 1,
            stroke: "none",
            strokeWidth: 0.25776,
            strokeDasharray: "none",
            strokeOpacity: 1,
          }}
          transform="rotate(-15)"
        />
        <path
          d="m47.597 22.89 13.802 51.512"
          style={{
            fill: "#135c91",
            fillOpacity: 1,
            stroke: "#135c91",
            strokeWidth: 1,
            strokeLinecap: "butt",
            strokeLinejoin: "miter",
            strokeOpacity: 1,
          }}
        />
        <path
          d="M10.419 51.39h10.546v6.354H10.419z"
          style={{
            display: "inline",
            fill: "#dd6b2c",
            fillOpacity: 1,
            stroke: "none",
            strokeWidth: 0.174562,
            strokeDasharray: "none",
            strokeOpacity: 1,
          }}
          transform="rotate(-15)"
        />
        <path
          d="M11.131 42.401h26.188v6.354H11.131z"
          style={{
            display: "inline",
            fill: "#dc6b2c",
            fillOpacity: 1,
            stroke: "none",
            strokeWidth: 0.275084,
            strokeDasharray: "none",
            strokeOpacity: 1,
          }}
          transform="rotate(-15)"
        />
        <circle
          cx={44.983}
          cy={35.231}
          r={1.045}
          style={{
            fill: "#fff",
            fillOpacity: 1,
            stroke: "none",
            strokeWidth: 0.226,
            strokeDasharray: "none",
            strokeOpacity: 1,
          }}
        />
        <circle
          cx={40.276}
          cy={36.389}
          r={1.045}
          style={{
            fill: "#fff",
            fillOpacity: 1,
            stroke: "none",
            strokeWidth: 0.226,
            strokeDasharray: "none",
            strokeOpacity: 1,
          }}
        />
        <circle
          cx={35.196}
          cy={37.755}
          r={1.045}
          style={{
            fill: "#fff",
            fillOpacity: 1,
            stroke: "none",
            strokeWidth: 0.226,
            strokeDasharray: "none",
            strokeOpacity: 1,
          }}
        />
        <circle
          cx={30.439}
          cy={38.977}
          r={1.045}
          style={{
            fill: "#fff",
            fillOpacity: 1,
            stroke: "none",
            strokeWidth: 0.226,
            strokeDasharray: "none",
            strokeOpacity: 1,
          }}
        />
        <circle
          cx={26.038}
          cy={40.136}
          r={1.045}
          style={{
            fill: "#fff",
            fillOpacity: 1,
            stroke: "none",
            strokeWidth: 0.226,
            strokeDasharray: "none",
            strokeOpacity: 1,
          }}
        />
        <rect
          width={48.134}
          height={53.328}
          x={10.753}
          y={34.43}
          ry={5.275}
          style={{
            display: "inline",
            fill: "none",
            fillOpacity: 1,
            stroke: "#000",
            strokeOpacity: 1,
          }}
          transform="rotate(-15)"
        />
        <g
          style={{
            display: "inline",
          }}
        >
          <path
            d="M70.098 31.078c-2.38 1.662-4.472 3.669-5.639 6.211-.829 1.805-1.394 4.19 0 5.959-.384-2.307 5.179-4.598 6.68-5.172a43.625 43.625 0 0 1 4.677-1.476c.862-.985 3.704-2.215 1.065-1.996-2.562-.027-5.237-.185-7.633.869.757-1.785 2.677-3.183 4.357-4.254.46-1.053-2.369-.454-3.507-.14z"
            style={{
              fill: "#dd6b2c",
              fillOpacity: 1,
              stroke: "#000",
              strokeWidth: 0.9,
              strokeLinecap: "butt",
              strokeLinejoin: "miter",
              strokeDasharray: "none",
              strokeOpacity: 1,
            }}
            transform="translate(0 2.963)"
          />
          <path
            d="M70.098 31.078c1.138-.313 3.968-.912 3.507.14-1.68 1.072-3.6 2.47-4.357 4.255 2.396-1.054 5.07-.896 7.633-.87 2.64-.218-.203 1.012-1.065 1.997a54.492 54.492 0 0 1 3.49-.78c3.132-.592 6.313-1.102 9.51-.994 1.412 0 7.301.994 7.301.994l-9.394-3.267c4.439-1.291 3.247-.52 6.457-1.205.72-.154 1.66-.382 2.937-.723 0 0-5.428-2.345-8.31-2.656-1.84-.077-5.516.162-5.516.162l7.215-1.969s-2.752-.631-4.12-.547c-3.192.483-7.137.903-10.273 2.516-1.676.862-3.411 1.827-5.015 2.947z"
            style={{
              fill: "#fddc87",
              fillOpacity: 1,
              stroke: "#000",
              strokeWidth: 0.8,
              strokeLinecap: "butt",
              strokeLinejoin: "miter",
              strokeDasharray: "none",
              strokeOpacity: 1,
            }}
            transform="translate(0 2.963)"
          />
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
          xlinkHref="#g"
          width="100%"
          height="100%"
          transform="translate(-100 -100)"
        />
        <use
          xlinkHref="#g"
          width="100%"
          height="100%"
          transform="translate(0 -100)"
        />
        <use
          xlinkHref="#g"
          width="100%"
          height="100%"
          transform="translate(100 -100)"
        />
        <use
          xlinkHref="#g"
          width="100%"
          height="100%"
          transform="translate(-100)"
        />
        <use xlinkHref="#g" width="100%" height="100%" />
        <use
          xlinkHref="#g"
          width="100%"
          height="100%"
          transform="translate(100)"
        />
        <use
          xlinkHref="#g"
          width="100%"
          height="100%"
          transform="translate(-100 100)"
        />
        <use
          xlinkHref="#g"
          width="100%"
          height="100%"
          transform="translate(0 100)"
        />
        <use
          xlinkHref="#g"
          width="100%"
          height="100%"
          transform="translate(100 100)"
        />
      </g>
    </g>
  </svg>
)
export default GanttChartIcon
