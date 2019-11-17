import {
    handleCors,
    handleBodyRequestParsing,
    handleCompression,
    handleSession
  } from "./common";
  
  export default [handleCors, handleBodyRequestParsing, handleCompression, handleSession];