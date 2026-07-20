"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line, Sphere } from "@react-three/drei";
import { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";

// Node definition
interface SystemNode {
  id: string;
  name: string;
  role: "gateway" | "server" | "database";
  pos: [number, number, number];
  targetPos: [number, number, number];
  color: string;
  size: number;
}

// Particle flow definition
interface RequestFlow {
  id: number;
  fromNode: string;
  toNode: string;
  progress: number;
  speed: number;
}

// Connections list
const connections = [
  // Gateway to Servers
  { from: "gateway", to: "auth-server" },
  { from: "gateway", to: "gateway-server" },
  { from: "gateway", to: "worker-server" },
  // Servers to Databases
  { from: "auth-server", to: "sql-db" },
  { from: "gateway-server", to: "sql-db" },
  { from: "gateway-server", to: "cache-db" },
  { from: "worker-server", to: "cache-db" },
];

function Scene() {
  const { mouse, viewport } = useThree();
  
  // Nodes setup
  const [nodes, setNodes] = useState<SystemNode[]>([
    // Gateway (top)
    { id: "gateway", name: "API Gateway", role: "gateway", pos: [0, 2.2, 0], targetPos: [0, 2.2, 0], color: "#00f0ff", size: 0.15 },
    // Servers (middle)
    { id: "auth-server", name: "Auth Service", role: "server", pos: [-1.8, 0, 0], targetPos: [-1.8, 0, 0], color: "#9d4edd", size: 0.12 },
    { id: "gateway-server", name: "Event Service", role: "server", pos: [0, 0, 0], targetPos: [0, 0, 0], color: "#9d4edd", size: 0.12 },
    { id: "worker-server", name: "Job Worker", role: "server", pos: [1.8, 0, 0], targetPos: [1.8, 0, 0], color: "#9d4edd", size: 0.12 },
    // Databases (bottom)
    { id: "sql-db", name: "SQL Master DB", role: "database", pos: [-0.9, -2.2, 0], targetPos: [-0.9, -2.2, 0], color: "#00f0ff", size: 0.15 },
    { id: "cache-db", name: "Redis Cache", role: "database", pos: [0.9, -2.2, 0], targetPos: [0.9, -2.2, 0], color: "#00f0ff", size: 0.12 },
  ]);

  // Request particles pool
  const [flows, setFlows] = useState<RequestFlow[]>(() => 
    Array.from({ length: 15 }, (_, i) => {
      const conn = connections[Math.floor(Math.random() * connections.length)];
      return {
        id: i,
        fromNode: conn.from,
        toNode: conn.to,
        progress: Math.random(),
        speed: 0.008 + Math.random() * 0.012,
      };
    })
  );

  const nodeRefs = useRef<{ [key: string]: THREE.Group | null }>({});
  const flowMeshRefs = useRef<{ [key: number]: THREE.Mesh | null }>({});

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // 1. Mouse repulsion on nodes
    const mouseX = (mouse.x * viewport.width) / 2;
    const mouseY = (mouse.y * viewport.height) / 2;

    const updatedNodes = nodes.map((node) => {
      // Base positions float slightly over time
      const index = node.role === "gateway" ? 1 : node.role === "server" ? 2 : 3;
      const ox = Math.sin(time + index) * 0.05;
      const oy = Math.cos(time + index) * 0.05;

      const basePos: [number, number, number] = [
        node.targetPos[0] + ox,
        node.targetPos[1] + oy,
        node.targetPos[2],
      ];

      // Calculate distance to mouse in 3D
      const dx = mouseX - basePos[0];
      const dy = mouseY - basePos[1];
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 1.5) {
        // Push away from mouse
        const force = (1.5 - dist) * 0.12;
        const angle = Math.atan2(dy, dx);
        return {
          ...node,
          pos: [
            basePos[0] - Math.cos(angle) * force,
            basePos[1] - Math.sin(angle) * force,
            basePos[2],
          ] as [number, number, number],
        };
      }
      return { ...node, pos: basePos };
    });

    // We mutate node positions directly in the refs for frame-rate performance
    updatedNodes.forEach((n) => {
      const ref = nodeRefs.current[n.id];
      if (ref) {
        ref.position.set(n.pos[0], n.pos[1], n.pos[2]);
      }
    });

    // 2. Animate request flows
    setFlows((prevFlows) =>
      prevFlows.map((flow) => {
        let nextProgress = flow.progress + flow.speed;
        let nextFrom = flow.fromNode;
        let nextTo = flow.toNode;

        if (nextProgress >= 1) {
          nextProgress = 0;
          // Pick a random connection to route to next
          const conn = connections[Math.floor(Math.random() * connections.length)];
          nextFrom = conn.from;
          nextTo = conn.to;
        }

        // Interpolate mesh position
        const fromNodeObj = updatedNodes.find((n) => n.id === nextFrom);
        const toNodeObj = updatedNodes.find((n) => n.id === nextTo);
        const mesh = flowMeshRefs.current[flow.id];

        if (mesh && fromNodeObj && toNodeObj) {
          const p1 = new THREE.Vector3(...fromNodeObj.pos);
          const p2 = new THREE.Vector3(...toNodeObj.pos);
          const currentPos = new THREE.Vector3().lerpVectors(p1, p2, nextProgress);
          mesh.position.copy(currentPos);
        }

        return {
          ...flow,
          fromNode: nextFrom,
          toNode: nextTo,
          progress: nextProgress,
        };
      })
    );
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />

      {/* Render connections */}
      {connections.map((conn, idx) => {
        const fromNodeObj = nodes.find((n) => n.id === conn.from);
        const toNodeObj = nodes.find((n) => n.id === conn.to);
        if (!fromNodeObj || !toNodeObj) return null;

        return (
          <Line
            key={`line-${idx}`}
            points={[fromNodeObj.pos, toNodeObj.pos]}
            color="#26262b"
            lineWidth={1}
            transparent
            opacity={0.3}
          />
        );
      })}

      {/* Render Nodes */}
      {nodes.map((node) => {
        const isServer = node.role === "server";
        return (
          <group
            key={node.id}
            ref={(el) => {
              nodeRefs.current[node.id] = el;
            }}
            position={node.pos}
          >
            {/* Outer wireframe sphere */}
            <mesh>
              <sphereGeometry args={[node.size * 1.6, 8, 8]} />
              <meshBasicMaterial
                color={node.color}
                wireframe
                transparent
                opacity={0.15}
              />
            </mesh>

            {/* Inner solid sphere */}
            <Sphere args={[node.size, 16, 16]}>
              <meshBasicMaterial color={node.color} transparent opacity={0.65} />
            </Sphere>

            {/* Ring halo */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[node.size * 1.3, node.size * 1.4, 32]} />
              <meshBasicMaterial
                color={node.color}
                transparent
                opacity={0.3}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        );
      })}

      {/* Render flows (request particles) */}
      {flows.map((flow) => {
        const toNodeObj = nodes.find((n) => n.id === flow.toNode);
        const color = toNodeObj?.color || "#00f0ff";
        return (
          <mesh
            key={`flow-${flow.id}`}
            ref={(el) => {
              flowMeshRefs.current[flow.id] = el;
            }}
          >
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshBasicMaterial color={color} toneMapped={false} />
          </mesh>
        );
      })}
    </>
  );
}

export default function BackendCanvas() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(true);
  }, []);

  if (!active) return null;

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 60 }}
        style={{ background: "transparent" }}
        gl={{ antialias: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
