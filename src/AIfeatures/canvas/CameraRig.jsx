import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';

import state from '../store';

const CameraRig = ({ children }) => {
  const group = useRef();
  const snap = useSnapshot(state);

  useFrame((state, delta) => {
    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;

    // Set the target camera position based on intro and screen
    let targetPosition = [-0.4, 0, 2];
    if (snap.intro) {
      if (isBreakpoint) targetPosition = [0, 0, 2];
      if (isMobile) targetPosition = [0, 0.2, 2.5];
    } else {
      if (isMobile) targetPosition = [0, 0, 2.5];
      else targetPosition = [0, 0, 2];
    }

    // Smooth camera position
    easing.damp3(state.camera.position, targetPosition, 0.25, delta);

    // Smooth rotation from pointer
    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5, 0],
      0.25,
      delta
    );

    // --- Eye-catching automatic rotation ---
    group.current.rotation.y += delta * 0.2;  // slow continuous Y rotation

    // --- Subtle floating animation ---
    group.current.position.y = Math.sin(state.clock.elapsedTime / 2) * 0.05;
    group.current.position.x = Math.sin(state.clock.elapsedTime / 4) * 0.03;
  });

  return <group ref={group}>{children}</group>;
};

export default CameraRig;
