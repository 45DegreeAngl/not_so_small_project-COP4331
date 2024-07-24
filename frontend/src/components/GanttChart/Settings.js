
export default function Settings({ children }) {
    return (
      <div id="settings">
        {children}
        <style jsx>{`
          #settings {
            display: flex;
            flex-wrap: wrap;
            padding: 1rem 0;
          }
        `}</style>
      </div>
    );
  }
  
