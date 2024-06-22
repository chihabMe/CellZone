"use client";
import { motion } from "framer-motion";

import React, { ReactNode } from "react";

const ClientMotion = (props: { children: ReactNode; idx: number }) => {
  return (
    <motion.div
    className=""
      initial={{ opacity: 0.8,x:-2}}
      animate={{ opacity: 1,x:0 }}
      transition={{ delay: props.idx * 0.1 }}
    >
      {props.children}
    </motion.div>
  );
};

export default ClientMotion;
