export function PiratesLogo({ className }: { className?: string }) {
  return (
    <img 
      src="/pirates-logo-p.png" 
      alt="Pittsburgh Pirates P logo" 
      className={className}
      style={{
        objectFit: 'contain',
        display: 'block'
      }}
    />
  )
}
