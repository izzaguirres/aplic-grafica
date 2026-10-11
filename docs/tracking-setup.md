# Tracking de conversão

## mrkr via Google Tag Manager

Desde o release de 06/10/2026, o mrkr é entregue pelo contêiner GTM existente. O layout raiz inclui `data-mrkr-delivery="gtm"` somente quando `VERCEL_ENV` é `production`; a configuração da tag fica no GTM. Não reinstalar o carregador direto nem tratar o ambiente local como produção para fazer QA.

`NEXT_PUBLIC_GTM_ID` habilita o contêiner no layout. Deixe essa variável vazia no desenvolvimento quando não precisar testar GTM. Atlas/Pixerun tem carregador próprio e não é desativado por essa escolha.

## Atlas / Pixerun

A tag `site_821pr6lli54jv4` é carregada uma única vez pelo `next/script` no layout raiz, com estratégia `afterInteractive`. O script do fornecedor acompanha navegações internas e cliques em links de WhatsApp; não adicionamos um disparo manual duplicado.

A CSP permite os scripts de `cdn-pixel.pixerun.com` e `cdn-widgets.pixerun.com`, o coletor `api.pixerun.com` e a configuração de widgets no bucket público `pixerun-web-widget-public-data.s3.us-east-1.amazonaws.com`. Configurações de widgets continuam sob controle da conta Atlas.

O GTM e seus eventos existentes permanecem independentes. Eventos automáticos do Atlas, inclusive cliques de contato, também não comprovam conversa ou venda.

## Evento técnico

O site emite um único evento `whatsapp_click` por ativação de CTA. Esse evento registra a intenção de abrir o WhatsApp; não representa conversa iniciada, lead, orçamento, pedido ou venda.

O contrato mantém os campos consumidos pelo GTM v8:

- `event_category`
- `event_label`
- `whatsapp_url`
- `page_path`

E acrescenta contexto para análise sem alterar o valor da conversão do Google Ads:

- `conversion_source`, `conversion_scope` e `conversion_context`
- `product`, `product_id`, `product_variant`, `product_quantity`
- `product_price` e `product_currency`
- `page_location`, `page_title`, `landing_page`, `landing_path` e `referrer`
- `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `gclid`, `fbclid` e `msclkid`, quando disponíveis

`product_price` e `product_currency` são deliberadamente diferentes de `value` e `currency`. Assim, os valores mostrados no catálogo enriquecem a leitura do clique sem transformar o valor do produto em valor de conversão no Ads.

## Atribuição

A primeira origem é capturada na entrada e preservada em `sessionStorage` durante a navegação interna. Se o visitante chegar com UTMs na home e pedir um produto depois de abrir o catálogo, o evento mantém a origem inicial e registra a página atual do clique separadamente.

## Escopos

- `catalog_product`: produto, variação, quantidade e preço escolhidos no card.
- `product_family`: CTA geral de uma página de produto.
- `custom_order`: medida, formato ou acabamento fora do catálogo.
- `general_quote`: orçamento geral.
- `artwork_submission`: envio ou conferência de arte.
- `order_support`: acompanhamento de pedido existente.

## Limites do funil

1. `whatsapp_click`: medido pelo site e encaminhado pelo GTM.
2. Conversa iniciada: deve ser confirmada no canal de atendimento.
3. Orçamento enviado: deve ser registrado pela operação comercial.
4. Venda: deve ser registrada no controle financeiro ou CRM.

Esses quatro estados nunca devem ser consolidados como uma única conversão.
