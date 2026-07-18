// src/main.jsx
import { useState } from 'react';

/**
 * @param {import('react').PropsWithChildren<{
 *  initialCount?: number
 * }>} props
 * @returns {import{'react'}.ReactElement}
 */
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function Counter(props) {
  const {
    initialCount = 0
  } = props;
  const [count, setCount] = useState(initialCount);
  const onClick = () => {
    setCount(prev => prev + 1);
  };
  return /*#__PURE__*/_jsxs("button", {
    onClick: onClick,
    children: ["Contador: ", count]
  });
}