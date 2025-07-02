"use server"

// Configuração da API Claude para Arca AI Chat
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY // Accessing from environment variables

// Sistema de prompt para contextualizar o assistente
const SYSTEM_PROMPT = `Você é o assistente de IA da Arca AI, especializado em imóveis, ROI e investimentos em Orlando.

Ajude os usuários a pesquisar, analisar e decidir sobre investimentos imobiliários com informações precisas e relevantes.

Forneça análises detalhadas quando solicitado sobre mercado imobiliário, retorno sobre investimento e oportunidades em Orlando.

Seja profissional, conciso e útil em suas respostas. Se não souber a resposta a alguma pergunta específica, 

seja honesto e sugira que o usuário entre em contato com um consultor da Arca para informações mais detalhadas.`

// Função auxiliar para estimar contagem de tokens (aproximação)
function estimateTokenCount(text: string | null | undefined) {
  if (!text) return 0
  // Aproximadamente 3.5 caracteres = 1 token em português
  return Math.ceil(text.length / 3.5)
}

// Função principal para processar mensagens
export async function processArcaAIChat(
  userMessage: string,
  conversationHistory: { role: string; content: string }[] = [],
) {
  if (!ANTHROPIC_API_KEY) {
    return {
      success: false,
      error: "API Key for Anthropic is not configured.",
      details: "ANTHROPIC_API_KEY environment variable is missing.",
    }
  }

  try {
    const messages = [
      ...conversationHistory.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      { role: "user", content: userMessage },
    ]

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-haiku-20240307",
        max_tokens: 1000,
        system: SYSTEM_PROMPT,
        messages: messages,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Erro na API Claude:", errorData)
      return {
        success: false,
        error: errorData.error?.message || "Erro ao processar a mensagem",
        details: errorData,
      }
    }

    const data = await response.json()

    const inputTokensEstimate = estimateTokenCount(userMessage)
    const outputTokensEstimate = data.content && data.content[0] ? estimateTokenCount(data.content[0].text) : 0

    console.log(`Uso estimado: ${inputTokensEstimate} tokens de entrada, ${outputTokensEstimate} tokens de saída`)

    return {
      success: true,
      response: data.content && data.content[0] ? data.content[0].text : "",
      inputTokens: inputTokensEstimate,
      outputTokens: outputTokensEstimate,
    }
  } catch (error: any) {
    console.error("Erro ao processar mensagem:", error)
    return {
      success: false,
      error: "Erro ao processar a mensagem",
      details: error.message,
    }
  }
}

// Função para processar uploads de documentos
export async function processDocument(documentContent: string, documentType: string) {
  if (!ANTHROPIC_API_KEY) {
    return {
      success: false,
      error: "API Key for Anthropic is not configured.",
      details: "ANTHROPIC_API_KEY environment variable is missing.",
    }
  }

  try {
    const documentPrompt = `Analise o seguinte documento do tipo ${documentType} e extraia informações relevantes 
    relacionadas a imóveis, investimentos ou análise de mercado. Forneça um resumo das informações 
    mais importantes e destaque pontos de atenção: \n\n${documentContent}`

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-haiku-20240307",
        max_tokens: 1500,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: documentPrompt }],
      }),
    })

    const data = await response.json()

    return {
      success: true,
      analysis: data.content && data.content[0] ? data.content[0].text : "",
      documentType: documentType,
    }
  } catch (error: any) {
    console.error("Erro ao processar documento:", error)
    return {
      success: false,
      error: "Erro ao analisar o documento",
      details: error.message,
    }
  }
}
