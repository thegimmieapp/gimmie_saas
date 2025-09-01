import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    // Hook for telemetry if desired
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null })
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{padding: '2rem', maxWidth: 900, margin: '0 auto'}}>
          <h1 style={{marginBottom: '0.5rem'}}>Something went wrong</h1>
          <p style={{marginBottom: '1rem'}}>An unexpected error occurred. Try reloading the page.</p>
          <button onClick={this.handleReload} style={{padding: '0.5rem 1rem', borderRadius: 8, border: '1px solid #ccc'}}>
            Reload
          </button>
          {process.env.NODE_ENV !== 'production' && this.state.error && (
            <pre style={{whiteSpace: 'pre-wrap', marginTop: '1rem', background: '#f6f8fa', padding: '1rem', borderRadius: 8}}>
{String(this.state.error.stack || this.state.error)}
            </pre>
          )}
        </div>
      )
    }
    return this.props.children
  }
}
