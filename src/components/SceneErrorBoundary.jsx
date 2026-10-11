import React, { Component } from 'react';

/**
 * Clean silent error boundary for WebGL.
 * Tidak menampilkan kotak peringatan invasif yang merusak estetika desain Apple.
 */
export class SceneErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn('WebGL render context warning:', error);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}
export default SceneErrorBoundary;
