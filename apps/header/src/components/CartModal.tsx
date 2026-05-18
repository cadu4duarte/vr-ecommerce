import { CartItem as Item } from '../../../shared/types/CartItem'
import { createPortal } from 'react-dom'

type CartModalProps = {
  isOpen: boolean
  items: Item[]
  onClose: () => void
  onRemove: (id: number) => void
  onClear: () => void
}

export function CartModal({
  isOpen,
  items,
  onClose,
  onRemove,
  onClear
}: CartModalProps) {
  if (!isOpen) return null

  // Agrupa os itens pelo ID e adiciona a propriedade quantity
  const groupedItems = items.reduce((acc, item) => {
    const found = acc.find((i) => i.id === item.id);
    if (found) {
      found.quantity += 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, [] as (Item & { quantity: number })[]);

  const total = items.reduce((acc, item) => acc + item.price, 0);

  return createPortal(
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />

      <aside
        className="
          fixed z-50
          top-0
          right-0
          h-screen
          w-full
          sm:w-[627px]
          bg-white
          shadow-xl
          flex flex-col
          animate-in slide-in-from-right duration-300
        "
      >
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-sm font-semibold text-black uppercase tracking-wider">
            Compras
            <span className="ml-2 text-gray-400 font-normal">
              {items.length}
            </span>
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-black transition-colors text-xl"
          >
            ✕
          </button>
        </div>

        <div
          className="
            flex-1
            overflow-y-auto
            pt-[40px]
            pl-4 sm:pl-[56px]
            pr-4 sm:pr-6
            pb-6
            max-w-[491px]
          "
        >
          {items.length === 0 ? (
            <div className="flex flex-col items-center mt-10">
              <p className="text-sm text-gray-400 italic">Seu carrinho está vazio</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* ALTERADO: Agora mapeamos os itens agrupados */}
              {groupedItems.map((item) => (
                <div
                  key={item.id}
                  className="
                    flex items-center justify-between
                    border border-[#02D72F]
                    rounded-md
                    px-4 py-3
                    bg-white
                  "
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden border border-gray-100 flex-shrink-0 relative">
                      {/* Badge de quantidade sobre a imagem */}
                      {item.quantity > 1 && (
                        <span className="absolute top-0 right-0 bg-[#02D72F] text-white text-[10px] font-bold px-1 rounded-bl-md z-10">
                          {item.quantity}x
                        </span>
                      )}
                      {item.thumbnail ? (
                        <img
                          src={item.thumbnail}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">🖼</div>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-800 line-clamp-1">
                        {item.name}
                      </span>
                      <button
                        onClick={() => onRemove(item.id)}
                        className="text-[10px] text-red-400 hover:text-red-600 text-left uppercase font-bold mt-1"
                      >
                        Remover {item.quantity > 1 ? 'todos' : ''}
                      </button>
                    </div>
                  </div>

                  <div className="text-right flex flex-col">
                    <span className="font-['Montserrat'] text-[16px] font-bold text-[#1C1C1C]">
                      {(item.price * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                    {/* Mostra o valor unitário se houver repetição */}
                    {item.quantity > 1 && (
                      <span className="text-[10px] text-gray-400 italic">
                        {item.quantity}x {item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {items.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm font-bold text-gray-500 uppercase">Total</span>
                <span className="text-xl font-black text-gray-900">
                  {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <button
                  onClick={() => {
                    alert("Compra realizada com sucesso!");
                    onClear();
                    onClose();
                  }}
                  className="bg-[#02D72F] text-white text-xs px-8 py-3 rounded-full font-black uppercase hover:bg-green-600 transition-all shadow-sm"
                >
                  Concluir compras
                </button>

                <button
                  onClick={onClose}
                  className="text-xs font-bold text-gray-400 uppercase hover:text-gray-600 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>,
    document.body
  )
}