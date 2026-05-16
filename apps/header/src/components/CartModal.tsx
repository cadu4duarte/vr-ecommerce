import React from 'react'
import { CartItem as Item } from '../types/CartItem'
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

  return createPortal(
    <>
      {/* Overlay escuro */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* PAINEL BRANCO — AGORA VAI ATÉ O TOPO */}
      <aside
        className="
          fixed z-50
          top-0
          right-0
          h-screen
          w-[627px]
          bg-white
          shadow-xl
          flex flex-col
        "
      >
        {/* Header do painel */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-sm font-semibold">
            Compras
            <span className="ml-2 text-gray-400">
              {items.length}
            </span>
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>

        {/* SESSÃO INTERNA (491px) */}
        <div
          className="
            flex-1
            overflow-y-auto
            pt-[40px]
            pl-[56px]
            pr-6
            pb-6
            max-w-[491px]
          "
        >
          {items.length === 0 ? (
            <p className="text-sm text-gray-500">
              Carrinho vazio
            </p>
          ) : (
            <div className="space-y-4">
              {items.map(item => (
                <div
                  key={item.id}
                  className="
                    flex items-center justify-between
                    border border-[#02D72F]
                    rounded-md
                    px-4 py-3
                  "
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                      🖼
                    </div>

                    <span className="text-sm">
                      {item.name}
                    </span>
                  </div>

                  <span className="text-sm font-medium">
                    R$ {item.price}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Footer interno */}
          <div className="mt-6 flex items-center justify-between">
            <button
              className="
                bg-[#02D72F]
                text-white
                text-sm
                px-6 py-2
                rounded-full
                font-semibold
                hover:opacity-90
              "
            >
              Concluir compras
            </button>

            <button
              onClick={onClose}
              className="text-sm text-gray-600"
            >
              Cancelar
            </button>
          </div>
        </div>
      </aside>
    </>,
    document.body
  )
}