
interface GarlandProps {
  enabled: boolean;
  variant?: "green" | "white";
}

const greenColors = [
  "#ff5b5b",
  "#ffd76a",
  "#70d7ff",
  "#ff75b9",
  "#ffd76a",
  "#70d7ff",
  "#ff5b5b",
];

const whiteColors = [
  "#861f35",
  "#a77a24",
  "#243e70",
  "#752b4d",
  "#a77a24",
  "#243e70",
  "#861f35",
];

const garlandRows = [
  {
    start: [150, 180],
    control1: [165, 235],
    control2: [235, 235],
    end: [250, 180],
  },
  {
    start: [105, 270],
    control1: [145, 330],
    control2: [255, 330],
    end: [295, 270],
  },
  {
    start: [70, 350],
    control1: [130, 405],
    control2: [270, 405],
    end: [330, 350],
  },
];

function getPoint(
  t: number,
  start: number[],
  control1: number[],
  control2: number[],
  end: number[]
) {
  const inverse = 1 - t;

  const x =
    inverse ** 3 * start[0] +
    3 * inverse ** 2 * t * control1[0] +
    3 * inverse * t ** 2 * control2[0] +
    t ** 3 * end[0];

  const y =
    inverse ** 3 * start[1] +
    3 * inverse ** 2 * t * control1[1] +
    3 * inverse * t ** 2 * control2[1] +
    t ** 3 * end[1];

  return { x, y };
}

export default function Garland({
  enabled,
  variant = "green",
}: GarlandProps) {
  const colors = variant === "white" ? whiteColors : greenColors;

  return (
    <g
      className={`tree-garland ${enabled ? "garland-on" : "garland-off"}`}
    >
      {garlandRows.map((row, rowIndex) => {
        const points = colors.map((color, index) => {
          const t = index / (colors.length - 1);

          return {
            ...getPoint(
              t,
              row.start,
              row.control1,
              row.control2,
              row.end
            ),
            color,
            index,
          };
        });

        return (
          <g key={rowIndex}>
            <path
              className="tree-garland-wire"
              d={`
                M ${row.start[0]} ${row.start[1]}
                C ${row.control1[0]} ${row.control1[1]},
                  ${row.control2[0]} ${row.control2[1]},
                  ${row.end[0]} ${row.end[1]}
              `}
            />

            {points.map((bulb) => (
              <g key={bulb.index}>
                <line
                  x1={bulb.x}
                  y1={bulb.y - 7}
                  x2={bulb.x}
                  y2={bulb.y}
                  className="tree-garland-socket"
                />

                <circle
                  cx={bulb.x}
                  cy={bulb.y}
                  r="4.5"
                  fill={bulb.color}
                  className="tree-garland-bulb"
                  style={{
                    color: bulb.color,
                    animationDelay: `${
                      (bulb.index + rowIndex * 3) * 0.19
                    }s`,
                  }}
                />
              </g>
            ))}
          </g>
        );
      })}
    </g>
  );
}
