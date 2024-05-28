import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Dimensions, FlatList, Image } from 'react-native';

const listTab = [
  {
    status: 'All'
  },
  {
    status: 'Purple'
  },
  {
    status: 'Green'
  },
];

const data = [
  {
     name: 'Ronaldo',
     status: 'Green'
  },
  {
    name: 'Messi',
    status: 'Purple'
  },
  {
    name: 'Kaka',
    status: 'Green'
  },
  {
    name: 'Ronaldinho',
    status: 'Green'
  },
  {
    name: 'Kross',
    status: 'Purple'
  }
]
export default function App() {
  const [status, setStatus] = useState('All');
  const [datalist, setDatalist] = useState(data);

  const setStatusFilter = status => {
    if(status !== 'All'){
      setDatalist([...data.filter(e => e.status === status)])
    }else{
      setDatalist(data)
    }
    setStatus(status)
  }

  const renderItem = ({item, index}) => {
    return (
      <View key={index} style={styles.itemContainer}>
        <View style={styles.itemLogo}>
          <Image style={styles.itemImage} source={{uri: 'https://store.juventus.com/data/store/product/3/35851/product.jpg'}}/>
        </View>

        <View style={styles.itemBody}> 
          <Text style={styles.itemName}>{item.name}</Text>
        </View>

        <View style={[
                  styles.itemStatus, 
                  {backgroundColor: item.status === 'Purple' ? '#e5848e' : '#69c080'}
                ]}>
          <Text>{item.status}</Text>
        </View>
      </View>
    )
  }

  const separator = () => {
    return (<View style={{height: 1, backgroundColor: '#f1f1f1'}}></View>)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.listTab}>
        {
          listTab.map(e => (
            <TouchableOpacity 
              style={[styles.btnTab, status === e.status && styles.btnTabActive ]}
              onPress={() => setStatusFilter(e.status)}
              >
              <Text style={[styles.textTab, status === e.status && styles.textTabAtive]}>{e.status}</Text>
            </TouchableOpacity>
          ))
        }
        
      </View>

      <FlatList 
        data={datalist} 
        keyExtractor={(e, i) => i.toString()} 
        renderItem={renderItem}
        ItemSeparatorComponent={separator}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center'
  },
  listTab: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 20
  },
  btnTab: {
    width: Dimensions.get('window').width / 3.5,
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: '#EBEBEB',
    padding: 10,
    justifyContent: 'center',
  },
  textTab: {
    fontSize: 16
  },
  btnTabActive: {
    backgroundColor: '#E6838D'
  },
  textTabAtive: {
    color: '#fff'
  },
  itemContainer: {
    flexDirection: 'row',
    paddingVertical: 15
  },
  itemLogo: {
    padding: 10
  },
  itemImage: {
    width: 50,
    height: 50
  },
  itemBody: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 16
  },
  itemStatus: {
    backgroundColor: 'green',
    paddingHorizontal: 6,
    justifyContent: 'center',
    right: 12
  }
});
