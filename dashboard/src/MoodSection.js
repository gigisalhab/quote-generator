import React from 'react';
import './MoodSection.css'; // Ensure this CSS file exists and has the below styles

function MoodSection() {
  return (
    <div className="mood-section">
      <div className="mood-title">
        <h2>About SoulSpeaks</h2>
      </div>
      <div className="mood-content">
        <p>Welcome to Soul Speaks, where the profound simplicity of words meets the depth of your emotions. In the mosaic of life's experiences, each moment carries its own shade of joy, sorrow, reflection, and inspiration...</p>
        <p>This journey began with a simple yet compelling vision: to create a sanctuary where individuals can find words that echo their innermost feelings, thoughts that mirror their current state of mind, and wisdom that speaks directly to their souls.</p>
        <p>Try it out below!</p>
      </div>
    </div>
  );
}

export default MoodSection;
