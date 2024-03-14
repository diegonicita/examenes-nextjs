export function BurgerIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
    className="inline-block w-8 h-8 stroke-current"    
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 18L20 18"        
        stroke-width="2"
        stroke-linecap="round"
      />
      <path
        d="M4 12L20 12"        
        stroke-width="2"
        stroke-linecap="round"
      />
      <path
        d="M4 6L20 6"        
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  )
}
