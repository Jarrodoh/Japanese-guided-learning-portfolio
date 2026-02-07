// Floating blurry circles background - paint drop style
export default function PageBackground({ variant = 'default' }) {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gray-950">
      {/* CSS Keyframes for floating animation */}
      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(50px, -80px) scale(1.1); }
          50% { transform: translate(-30px, -120px) scale(0.9); }
          75% { transform: translate(-60px, -40px) scale(1.05); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(-70px, 60px) scale(0.95); }
          50% { transform: translate(40px, 100px) scale(1.1); }
          75% { transform: translate(80px, 30px) scale(1); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0) scale(1.05); }
          25% { transform: translate(100px, -50px) scale(0.9); }
          50% { transform: translate(60px, 80px) scale(1.15); }
          75% { transform: translate(-40px, 60px) scale(1); }
        }
        @keyframes float4 {
          0%, 100% { transform: translate(0, 0) scale(0.95); }
          25% { transform: translate(-80px, -70px) scale(1.1); }
          50% { transform: translate(-120px, 40px) scale(1); }
          75% { transform: translate(30px, -30px) scale(0.9); }
        }
        @keyframes float5 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(60px, 90px) scale(1.05); }
          50% { transform: translate(-50px, 50px) scale(0.95); }
          75% { transform: translate(-90px, -60px) scale(1.1); }
        }
        @keyframes float6 {
          0%, 100% { transform: translate(0, 0) scale(1.1); }
          25% { transform: translate(-40px, -100px) scale(0.9); }
          50% { transform: translate(80px, -60px) scale(1); }
          75% { transform: translate(50px, 70px) scale(1.05); }
        }
        .floating-circle {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          pointer-events: none;
        }
      `}</style>
      
      {/* Subtle gradient overlay for depth */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(3, 7, 18, 0.8) 100%)',
          zIndex: 2,
        }}
      />
      
      {/* Floating blurry circles */}
      {/* Large amber circle - top left */}
      <div 
        className="floating-circle"
        style={{
          width: '400px',
          height: '400px',
          top: '10%',
          left: '15%',
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.25) 0%, transparent 70%)',
          animation: 'float1 20s ease-in-out infinite',
        }}
      />
      
      {/* Medium orange circle - right side */}
      <div 
        className="floating-circle"
        style={{
          width: '300px',
          height: '300px',
          top: '30%',
          right: '10%',
          background: 'radial-gradient(circle, rgba(249, 115, 22, 0.3) 0%, transparent 70%)',
          animation: 'float2 18s ease-in-out infinite',
        }}
      />
      
      {/* Small red-orange circle - bottom left */}
      <div 
        className="floating-circle"
        style={{
          width: '250px',
          height: '250px',
          bottom: '20%',
          left: '20%',
          background: 'radial-gradient(circle, rgba(220, 38, 38, 0.2) 0%, transparent 70%)',
          animation: 'float3 22s ease-in-out infinite',
        }}
      />
      
      {/* Large soft amber - center right */}
      <div 
        className="floating-circle"
        style={{
          width: '450px',
          height: '450px',
          top: '50%',
          right: '25%',
          background: 'radial-gradient(circle, rgba(217, 119, 6, 0.2) 0%, transparent 70%)',
          animation: 'float4 25s ease-in-out infinite',
        }}
      />
      
      {/* Small amber circle - top right */}
      <div 
        className="floating-circle"
        style={{
          width: '200px',
          height: '200px',
          top: '5%',
          right: '30%',
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.35) 0%, transparent 70%)',
          animation: 'float5 16s ease-in-out infinite',
        }}
      />
      
      {/* Medium circle - bottom center */}
      <div 
        className="floating-circle"
        style={{
          width: '350px',
          height: '350px',
          bottom: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'radial-gradient(circle, rgba(180, 83, 9, 0.25) 0%, transparent 70%)',
          animation: 'float6 23s ease-in-out infinite',
        }}
      />
      
      {/* Extra small accent - floating freely */}
      <div 
        className="floating-circle"
        style={{
          width: '150px',
          height: '150px',
          top: '60%',
          left: '5%',
          background: 'radial-gradient(circle, rgba(251, 146, 60, 0.3) 0%, transparent 70%)',
          animation: 'float2 15s ease-in-out infinite reverse',
        }}
      />
      
      {/* Another small accent */}
      <div 
        className="floating-circle"
        style={{
          width: '180px',
          height: '180px',
          top: '15%',
          left: '60%',
          background: 'radial-gradient(circle, rgba(234, 88, 12, 0.25) 0%, transparent 70%)',
          animation: 'float4 19s ease-in-out infinite reverse',
        }}
      />
    </div>
  );
}
