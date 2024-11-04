import { useCallback, memo } from "react";
import {
  ExpressSVG,
  MongooseSVG,
  SequelizeSVG,
  SocketioSVG,
  ReactSVG,
  ViteSVG,
  NextjsSVG,
} from "../../icons";
import styles from "./styles.module.css";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
  Position,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

export const ExpressNode = memo(({}: any) => (
  <>
    <Handle type="target" position={Position.Top} />
    <div className={`${styles.tech_node} ${styles.express}`}>
      <ExpressSVG />
    </div>
    <Handle type="target" id="right" position={Position.Right} />
    <Handle type="source" id="bottom" position={Position.Bottom} />
  </>
));

export const SocketIONode = memo(({}: any) => (
  <>
    <Handle type="source" position={Position.Left} />
    <div className={`${styles.tech_node} ${styles.socketio}`}>
      <SocketioSVG />
    </div>
  </>
));
export const MongooseNode = memo(({}: any) => {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className={`${styles.tech_node} ${styles.mongoose}`}>
        <MongooseSVG />
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
});
export const SequelizeNode = memo(({}: any) => {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className={`${styles.tech_node} ${styles.sequelize}`}>
        <SequelizeSVG />
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
});
export const ReactNode = memo(({}: any) => {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className={`${styles.tech_node} ${styles.react}`}>
        <ReactSVG />
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
});
export const ViteNode = memo(({}: any) => {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className={`${styles.tech_node} ${styles.vite}`}>
        <ViteSVG />
      </div>
    </>
  );
});
export const NextjsNode = memo(({}: any) => {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className={`${styles.tech_node} ${styles.nextjs}`}>
        <NextjsSVG />
      </div>
    </>
  );
});

const initialEdges = [
  {
    id: "socketio-express",
    source: "socketioNode",
    target: "expressNode",
    targetHandle: "right",
    animated: true,
  },
  {
    id: "mongoose-express",
    source: "mongooseNode",
    target: "expressNode",
    animated: true,
  },
  {
    id: "sequelize-express",
    source: "sequelizeNode",
    target: "expressNode",
    animated: true,
  },
  {
    id: "express-react",
    source: "expressNode",
    target: "reactNode",
    animated: true,
  },
  {
    id: "react-vite",
    source: "reactNode",
    target: "viteNode",
    animated: true,
  },
  {
    id: "react-nextjs",
    source: "reactNode",
    target: "nextjsNode",
    animated: true,
  },
];

const nodeTypes = {
  expressNode: ExpressNode,
  socketioNode: SocketIONode,
  mongooseNode: MongooseNode,
  sequelizeNode: SequelizeNode,
  reactNode: ReactNode,
  viteNode: ViteNode,
  nextjsNode: NextjsNode,
};

const initialNodes = [
  {
    id: "mongooseNode",
    type: "mongooseNode",
    data: {},
    position: { x: 60, y: 60 },
  },
  {
    id: "sequelizeNode",
    type: "sequelizeNode",
    data: {},
    position: { x: 230, y: 60 },
  },
  {
    id: "socketioNode",
    type: "socketioNode",
    data: {},
    position: { x: 230, y: 230 },
  },
  {
    id: "expressNode",
    type: "expressNode",
    data: {},
    position: { x: 60, y: 230 },
  },
  {
    id: "reactNode",
    type: "reactNode",
    data: {},
    position: { x: 145, y: 400 },
  },
  {
    id: "viteNode",
    type: "viteNode",
    data: {},
    position: { x: 60, y: 570 },
  },
  {
    id: "nextjsNode",
    type: "nextjsNode",
    data: {},
    position: { x: 230, y: 570 },
  },
];

export const ReactNodeTest = ({ className }: any) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );
  return (
    <div className={`${className} ${styles.react_flow_board}`}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        proOptions={{ hideAttribution: true }}
        draggable={false}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        panOnScroll={false}
      />
    </div>
  );
};
