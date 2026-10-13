import { CheckCircle2, Clock, Truck, UserCheck } from "lucide-react"

const benefits = [
  {
    icon: CheckCircle2,
    title: "Acabamento consistente",
    description: "Material conferido antes da produção e acabamento alinhado ao uso da sua empresa.",
  },
  {
    icon: Clock,
    title: "Prazo que se cumpre",
    description: "Você recebe um prazo real antes de aprovar o pedido. O combinado guia a produção.",
  },
  {
    icon: Truck,
    title: "Entrega em Florianópolis",
    description: "Pedidos online com entrega em toda Florianópolis. Condições confirmadas no atendimento.",
  },
  {
    icon: UserCheck,
    title: "Tudo pelo WhatsApp",
    description: "Você envia o arquivo, tira dúvidas, aprova o orçamento e combina a entrega em uma conversa objetiva.",
  },
]

export function Benefits() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {benefits.map((benefit, index) => (
        <div
          key={index}
          className="group p-6 rounded-2xl bg-white border border-[#CDD2D7] hover:border-[#28282D] hover:shadow-lg transition-all duration-300"
          style={{ transitionDelay: `${index * 0.15}s` }}
        >
          {/* Icon - Dark Grey */}
          <div className="mb-4 inline-flex p-3 rounded-xl bg-[#28282D]/5 text-[#28282D] group-hover:scale-110 transition-transform duration-300">
            <benefit.icon className="h-6 w-6" />
          </div>
          
          <h3 className="text-lg font-bold mb-2 text-[#28282D] group-hover:text-black transition-colors">
            {benefit.title}
          </h3>
          
          <p className="text-sm text-[#28282D]/70 leading-relaxed font-medium">
            {benefit.description}
          </p>
        </div>
      ))}
    </div>
  )
}
