'use client'

import { handleClientScriptLoad } from "next/script"
import { useState } from "react"

export function Button() {
    const [nome, setNome] = useState("autor")

    function handleChangeName()  {
        setNome("Sabrina Soares")
    }

return (
    <div>
        <button>Alter nome</button>
    </div>
)

}