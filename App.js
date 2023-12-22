import {
  Text,
  SafeAreaView,
  TextInput,
  View,
  TouchableOpacity,
  Keyboard,
  Image,
  Linking,
  StatusBar,
} from "react-native";
import { useState } from "react";
import { styles } from "./styles";
import * as Animatable from "react-native-animatable";
import { stylesResultado } from "./styles";

const text =
  "A fórmula utilizada para realizar esse cálculo é a seguinte: FQ = altura da queda/comprimento do talabarte. Para maiores informações acesse a norma regulamentadora 35.5.11 b/fator de queda clicando neste texto ou acesse o PRO-040866 disponível no Sispav";

let valor = 0;
let comprimentoTalabarte = "";
let alturaDaQueda = "";
let resultadoCalculo = 0;

function abrirLink() {
  Linking.openURL(
    "https://www.maconsultoria.com/fator-de-quedas-na-nr-35-trabalho-em-altura"
  );
}

function calcular(inputTexto) {
  if (valor == 0) {
    if (inputTexto != "") {
      comprimentoTalabarte = inputTexto;
      valor = valor + 1;
    }
  } else {
    if (inputTexto != "") {
      alturaDaQueda = inputTexto;
      alturaDaQueda = alturaDaQueda.replace(",", ".");
      comprimentoTalabarte = comprimentoTalabarte.replace(",", ".");
      console.log("Altura: " + alturaDaQueda);
      console.log("talabarte: " + comprimentoTalabarte);
      resultadoCalculo = Number(alturaDaQueda) / Number(comprimentoTalabarte);
      //console.log(resultadoCalculo);
    }
  }
}

export default function App() {
  const [inputTexto, setInputTexto] = useState("");
  const [btnTitulo, setbtnTitulo] = useState("Proxíma etapa");
  const [resultado, setResultado] = useState(false);
  const [textoTipoValor, setTextoTipoValor] = useState(
    "Informe o comprimento do talabarte"
  );
  const [imagem, setImagem] = useState(require("./assets/1.png"));
  const [imagemPrincipal, setImagemPrincipal] = useState(
    require("./assets/talabarte.png")
  );
  const [visibleCardAnimado, setVisibleCardAnimado] = useState(false);
  const [texValorCardAtencao, setTexValorCardAtencao] = useState("ATENÇÃO!");
  const [textValorCardResultado, setTextValorCardResultado] =
    useState("Fator de queda < 1");
  const [corCardAnimado, setCorCardAnimado] = useState(
    stylesResultado.notificarAnimadoCard
  );
  const [corCardAnimadoResultado, setCorCardAnimadoResultado] = useState(
    stylesResultado.cardResultadoText
  );

  function calcularValores() {
    calcular(inputTexto);
    if (inputTexto != "" && valor == 1) {
      setInputTexto("");
      setTextoTipoValor("Informe a altura da queda");
      setImagemPrincipal(require("./assets/img_calculo.png"));
      setbtnTitulo("Calcular");
    }

    if (resultadoCalculo > 0) {
      Keyboard.dismiss();
      setbtnTitulo("Proxíma etapa");
      setInputTexto("");
      setResultado(true);
      console.log(resultadoCalculo);

      if (resultadoCalculo < 1) {
        setImagem(require("./assets/Menor_que_1.png"));
        setVisibleCardAnimado(false);
        setTexValorCardAtencao("ATENÇÃO!");
        setTextValorCardResultado("Fator de queda < 1");
        setCorCardAnimado(stylesResultado.notificarAnimadoCardVerde);
        setCorCardAnimadoResultado(stylesResultado.cardResultadoTextVerde);
      } else if (resultadoCalculo == 1) {
        setImagem(require("./assets/1.png"));
        setVisibleCardAnimado(true);
        setTexValorCardAtencao("ATENÇÃO!");
        setTextValorCardResultado("Fator de queda = 1");
        setCorCardAnimado(stylesResultado.notificarAnimadoCard);
        setCorCardAnimadoResultado(stylesResultado.cardResultadoText);
      } else if (resultadoCalculo > 1) {
        setImagem(require("./assets/maior_ou_igual_2.png"));
        setVisibleCardAnimado(true);
        setTexValorCardAtencao("CUIDADO!!");
        setTextValorCardResultado("Fator de queda = 2");
        setCorCardAnimado(stylesResultado.notificarAnimadoCardVermelho);
        setCorCardAnimadoResultado(stylesResultado.cardResultadoTextVermelho);
      }
    }
  }
  function resetValores() {
    setResultado(false);
    valor = 0;
    comprimentoTalabarte = 0;
    alturaDaQueda = 0;
    resultadoCalculo = 0;
    setImagemPrincipal(require("./assets/talabarte.png"));
    setImagem(require("./assets/1.png"));
    setTextoTipoValor("Informe o comprimento do talabarte");
    setVisibleCardAnimado(true);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#009688FF" />

      <View
        style={
          resultado
            ? stylesResultado.telaResultado
            : stylesResultado.telaResultadoOculto
        }
      >
        <Animatable.View
          animation="pulse"
          easing="ease-out"
          iterationCount="infinite"
          style={
            visibleCardAnimado
              ? corCardAnimado
              : stylesResultado.notificarAnimadoCardOculto
          }
        >
          <Text style={stylesResultado.notificarAnimadoTexto}>
            {texValorCardAtencao}
          </Text>
        </Animatable.View>
        <Animatable.View
          animation="pulse"
          easing="ease-out"
          iterationCount="infinite"
          style={stylesResultado.card}
        >
          <Image style={stylesResultado.image} source={imagem} />
          <View style={corCardAnimadoResultado}>
            <Text style={stylesResultado.textBtnCalcular}>
              {textValorCardResultado}
            </Text>
          </View>
        </Animatable.View>
        <View style={stylesResultado.cardBtn}>
          <Text
            onPress={() => abrirLink()}
            style={stylesResultado.textParagrafo}
          >
            {text}
          </Text>
          <TouchableOpacity
            style={stylesResultado.btnNovoCalculo}
            onPress={() => resetValores()}
          >
            <Text style={stylesResultado.textBtnCalcular}>Novo cálculo</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.telaImagemPrincipal}>
        <Image style={styles.imagemPrincial} source={imagemPrincipal} />
      </View>

      <View style={styles.card}>
        <Text style={styles.titulo}>{textoTipoValor}</Text>
        <TextInput
          keyboardType={"numeric"}
          value={inputTexto}
          onChangeText={(texto) => setInputTexto(texto)}
          placeholder="Digite aqui o valor em metros ex.: 1.50"
          style={styles.caixaTexto}
        ></TextInput>
        <TouchableOpacity
          style={styles.btnCaclular}
          onPress={() => calcularValores()}
        >
          <Text style={styles.textBtn}>{btnTitulo}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}