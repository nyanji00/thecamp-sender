import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { HTMLAttributes } from "react";

interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  borderWidth?: number;
  borderColor?: string;
  borderTopColor?: string;
  size?: number;
}

function Spinner({
  borderWidth = 4,
  borderColor = "#0000001a",
  borderTopColor = "white",
  size = 24,
  ...rest
}: SpinnerProps) {
  const boxSize = size + borderWidth;

  return (
    <SpinnerRoot size={size} {...rest}>
      <svg height={boxSize} width={boxSize} viewBox={`0 0 ${boxSize} ${boxSize}`}>
        <LoaderSvg
          cx={boxSize / 2}
          cy={boxSize / 2}
          r={size / 2}
          style={{ strokeWidth: `${borderWidth}px`, stroke: borderColor }}
        />
        <LoaderSvg
          cx={boxSize / 2}
          cy={boxSize / 2}
          r={size / 2}
          animate={true}
          style={{ strokeWidth: `${borderWidth}px`, stroke: borderTopColor }}
        />
      </svg>
    </SpinnerRoot>
  );
}

const SpinnerRoot = styled.div<{ size: number }>`
  display: flex;
  align-content: center;
  justify-content: center;
  position: relative;

  ${({ size }) => css`
    @keyframes fill-animation {
      0% {
        stroke-dasharray: ${size * 3.14 * 0.25} ${size * 3.14 * 0.75};
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dasharray: ${size * 3.14 * 0.5};
        stroke-dashoffset: ${size * 3.14 * 0.5};
      }
      100% {
        stroke-dasharray: ${size * 3.14 * 0.25} ${size * 3.14 * 0.75};
        stroke-dashoffset: ${size * 3.14};
      }
    }
  `}
`;

const LoaderSvg = styled.circle<{ animate?: boolean }>`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  fill: none;
  stroke-linecap: round;

  ${({ animate }) =>
    animate &&
    css`
      animation: fill-animation 1.1s cubic-bezier(1, 1, 1, 1) 0s infinite;
    `}
`;

export default Spinner;
