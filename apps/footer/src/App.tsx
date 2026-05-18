import logo from '../../shared/assets/logo.svg'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#F2F2F2] border-t border-gray-200 h-[116px] py-10 px-6 mt-20">
      <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="flex items-center gap-4">
          <img 
            src={logo} 
            alt="VR Logo" 
            className="w-[51px] h-[50px] object-contain opacity-80 mix-blend-multiply" 
          />
          <p className="text-sm text-gray-500">
            © {currentYear} VR Benefícios - Todos os direitos reservados
          </p>
        </div>

        <div className="flex gap-8 text-xs font-bold text-gray-400 uppercase tracking-widest">
          <a href="#" className="hover:text-[#02D72F]">Termos de uso</a>
          <a href="#" className="hover:text-[#02D72F]">Privacidade</a>
          <a href="#" className="hover:text-[#02D72F]">Contato</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer