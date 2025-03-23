import FormContato from '../../components/FormContato';


const Contato = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12">
        <h1 className="text-center mt-5 mb-6 font-extrabold text-4xl text-gray-800"> Contato </h1>
      
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Fale Conosco</h2>
        
        <FormContato />

        <div className="mt-8 text-center">
          <h3 className="text-lg font-semibold text-gray-800">Nosso Contato</h3>
          <p className="text-gray-600">Telefone: (61) 91234-5678</p>
          <p className="text-gray-600">E-mail: contato@exemplo.com</p>
          
          <div className="flex justify-center space-x-6 mt-4">
            <a href="#" className="text-[#f502f6] hover:text-[#7208b4]">Facebook</a>
            <a href="#" className="text-[#f502f6] hover:text-[#7208b4]">Instagram</a>
            <a href="#" className="text-[#f502f6] hover:text-[#7208b4]">LinkedIn</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contato;
