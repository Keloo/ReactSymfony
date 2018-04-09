<?php

namespace App\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class SecurityControllerTest extends WebTestCase
{
    public function testRegisterWrongEmail()
    {
        $client = static::createClient();
        $client->request('POST', '/api/register');
        $response = json_decode($client->getResponse()->getContent());
        $this->assertEquals($response->code, 401);
    }
}