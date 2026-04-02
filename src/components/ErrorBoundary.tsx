"use client";

import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
          <div className="text-6xl mb-6">💀</div>
          <h1 className="font-heading text-2xl text-devil-red mb-3">
            Quelque chose a mal tourné à Hell&apos;s Kitchen
          </h1>
          <p className="text-devil-muted text-sm mb-8 max-w-xs">
            Même le Diable a ses mauvais jours. Réessaie dans un instant.
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="bg-devil-red text-white px-6 py-3 rounded-xl font-bold hover:bg-devil-red/90 transition-colors active:scale-95"
          >
            Réessayer
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
