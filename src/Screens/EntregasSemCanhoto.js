import React, { Component } from 'react';
import { FlatList, AsyncStorage, Alert } from 'react-native';
import ComponentEntregas from '../Components/ComponentEntregas'
import SemCanhoto from '../Components/SemCanhoto'
import moment from 'moment'
import 'moment/locale/pt-br'
import { connect } from 'react-redux'

initialState = {
    entregas: []
}

class EntregasSemCanhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entregas: [],
        };
    }


    VoltarPendente = async (item) => {
        console.log('upadteitem')
        const itemUpdate = {
            canhoto: false,
            finalizada: false,
            date: moment().format('YYYY[-]MM[-]D')
        }

        try {
            const id = item.id
            await AsyncStorage.mergeItem(`${id}`, JSON.stringify(itemUpdate))
            this.props.navigation.navigate('Home')
            return Alert.alert('Entrega com status Pendente.')
        } catch (err) {
            this.props.navigation.navigate('Home')
            return Alert.alert('Erro.')
            console.log(err)
        }
    }

    Detalhes = async (item) => {
        const data = await item
        this.props.navigation.navigate('DetalhesSemCanhoto', { ...data })
        console.log(data)
    }

    Voltar = () => {
        this.setState({ initialState })
        this.props.navigation.navigate('Home')
    }

    componentDidMount = async () => {
        await this.getEntregas()
        console.log(this.state.entregas)
    }

    getEntregas = async () => {
        const entregas = []
        await AsyncStorage.getAllKeys((error, keys) => {
            return AsyncStorage.multiGet(keys, (error, result) => {
                result.forEach(([key, val]) => {
                    entregas.push(JSON.parse(val));
                    console.log('Entregas', entregas)
                    this.setState({ entregas })
                })
            })
        });
    }

    render() {
        const { entregas } = this.state;
        const Filter = entregas.filter(e =>
            !e.canhoto && e.finalizada && e.cpf == this.props.cpf && e.placa == this.props.placa)
        return (
            <ComponentEntregas onVoltar={this.Voltar}
                lista={
                    <FlatList data={Filter}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({ item }) =>
                            <SemCanhoto {...item} obs={item.nome} item={item} onDetalhes={this.Detalhes} canhoto={this.VoltarPendente} />
                        } />
                } />

        );
    }
}

const mapStateToProps = ({ placaCpf }) => {
    return {
        placa: placaCpf.placa,
        cpf: placaCpf.cpf,
    }
}

export default connect(mapStateToProps, null)(EntregasSemCanhoto)