import { getUsuarioContext } from "../context/UsuarioContext"
import Nav from '@components/public/Nav.jsx'
import { XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Legend, PieChart, Pie, Cell } from 'recharts';
import "@styles/analise.css"
export default function Analise() {
    const { usuario } = getUsuarioContext()
    
    const dataOrdens = [
        { mes: 'janeiro', concluidas: 36, canceladas: 0 },
        { mes: 'fevereiro', concluidas: 46, canceladas: 1 },
        { mes: 'março', concluidas: 49, canceladas: 3 },
        { mes: 'abril', concluidas: 52, canceladas: 2 },
        { mes: 'maio', concluidas: 58, canceladas: 4 },
        { mes: 'junho', concluidas: 61, canceladas: 3 },
        { mes: 'julho', concluidas: 65, canceladas: 5 },
        { mes: 'agosto', concluidas: 68, canceladas: 4 },
        { mes: 'setembro', concluidas: 72, canceladas: 6 },
        { mes: 'outubro', concluidas: 74, canceladas: 5 },
        { mes: 'novembro', concluidas: 78, canceladas: 7 },
        { mes: 'dezembro', concluidas: 76, canceladas: 6 }

    ]
    const dataCargos = [
        {cargo: "adm", qtd: 2},
        {cargo: "tecnico", qtd: 23},
        {cargo: "base", qtd: 9},
    ]
    const RADIAN = Math.PI / 180
    const COLORS = ['#FFBB28', '#0088FE', '#00C49F',  '#FF8042']
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    }
    return (
        <div id='pageAnalise' className='paginas'>
            <Nav cargo={usuario?.cargo || ''}></Nav>
            <main id="mainAnalise">
                {/* <BarChart width={900} height={300} data={dataOrdens}>
                    <Legend 
                        align="right" 
                        verticalAlign="middle" 
                        layout="vertical"
                        iconType="circle"
                        margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
                        />
                    <XAxis dataKey="mes" stroke="#26110D" />
                    <YAxis />
                    <Tooltip />
                    <CartesianGrid stroke="#d96704" strokeDasharray="2 2" />
                    <Bar dataKey="concluidas" fill="#0cda4a"/>
                    <Bar dataKey="canceladas" fill="#ff8888"/>
                </BarChart>
                <PieChart width={730} height={250}>
                    <Legend></Legend>
                    <Pie 
                        data={dataCargos} 
                        dataKey={"qtd"} 
                        nameKey={"cargo"}
                        // label={({percent}) => {`${percent}%`}}
                        cx="50%"
                        cy="50%"
                        // outerRadius={90}
                        label={renderCustomizedLabel}
                        labelLine={false}
                        >
                        {dataCargos.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart> */}
                <section>
                    
                </section>
            </main>
        </div>
    )
}